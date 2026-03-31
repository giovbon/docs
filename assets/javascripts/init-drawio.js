/**
 * Draw.io (diagrams.net) Initialization for Zensical/MkDocs
 * - Tema dark por padrão (forçado no XML)
 * - Traços/fontes brancos (forçados no XML)
 * - API Nativa do GraphViewer (pan, zoom, fit, lightbox)
 *
 * Uso:
 *   <div class="drawio" data-src="path/arquivo.drawio" data-title="Título"></div>
 */

(function () {
  function getGraphViewer() {
    return window.GraphViewer;
  }

  function sanitizeXmlForDarkTheme(xml) {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    try {
      const doc = parser.parseFromString(xml, "text/xml");
      const model = doc.querySelector("mxGraphModel");

      if (model) {
        model.setAttribute("background", "#1e2129");
      }

      const cells = doc.querySelectorAll("mxCell[style]");
      cells.forEach((cell) => {
        const styleText = cell.getAttribute("style") || "";
        const parts = styleText
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean);

        const map = {};
        const order = [];
        parts.forEach((p) => {
          const idx = p.indexOf("=");
          if (idx === -1) return;
          const k = p.slice(0, idx).trim();
          const v = p.slice(idx + 1).trim();
          if (!(k in map)) order.push(k);
          map[k] = v;
        });

        const isEdge = cell.getAttribute("edge") === "1";
        const isVertex = cell.getAttribute("vertex") === "1";

        map.strokeColor = "#ffffff";
        map.fontColor = "#ffffff";

        if (isEdge) {
          map.endArrow = map.endArrow || "classic";
          map.endFill = "1";
        }

        if (isVertex) {
          map.labelBackgroundColor = "none";
          if (!("fillColor" in map)) {
            map.fillColor = "none";
          }
        }

        const serialized =
          order
            .map((k) => `${k}=${map[k]}`)
            .concat(
              Object.keys(map)
                .filter((k) => !order.includes(k))
                .map((k) => `${k}=${map[k]}`),
            )
            .join(";") + ";";

        cell.setAttribute("style", serialized);
      });

      return serializer.serializeToString(doc);
    } catch (e) {
      console.warn("[Drawio] Falha ao normalizar XML para tema dark:", e);
      return xml;
    }
  }

  async function initDrawio() {
    const GraphViewer = getGraphViewer();
    if (!GraphViewer) {
      console.warn(
        "[Drawio] GraphViewer não encontrado. Tentando novamente em 500ms...",
      );
      setTimeout(initDrawio, 500);
      return;
    }

    const elements = document.querySelectorAll(".drawio");
    let hasNew = false;

    for (const el of elements) {
      if (el.dataset.drawioInitialized) continue;
      el.dataset.drawioInitialized = "true";

      const src = el.getAttribute("data-src");
      if (!src) {
        el.innerHTML = `<div class="drawio-error">Erro: atributo <code>data-src</code> não informado.</div>`;
        continue;
      }

      let xml = "";
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} – ${response.statusText}`);
        }
        xml = await response.text();
        const lower = xml.trim().toLowerCase();
        if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) {
          throw new Error(
            `O arquivo retornou uma página HTML. Verifique o caminho: ${src}`,
          );
        }
      } catch (e) {
        console.error("[Drawio] Falha ao buscar arquivo:", src, e);
        el.innerHTML = `<div class="drawio-error">Erro ao carregar diagrama: <code>${src}</code><br><small>${e.message}</small></div>`;
        continue;
      }

      el.innerHTML = "";

      const mxDiv = document.createElement("div");
      mxDiv.className = "mxgraph";

      const normalizedXml = sanitizeXmlForDarkTheme(xml);

      // Configuração oficial do viewer.
      // A string 'toolbar' ativa os controles nativos do diagrams.net.
      // 'zoom' = botões de +/-/fit, 'lightbox' = modo tela cheia interativo com pan natural.
      const config = {
        xml: normalizedXml,
        toolbar: "zoom lightbox",
        resize: true,
        nav: true,
      };

      mxDiv.setAttribute("data-mxgraph", JSON.stringify(config));
      el.appendChild(mxDiv);

      const title = el.getAttribute("data-title");
      if (title) {
        const titleEl = document.createElement("div");
        titleEl.className = "drawio-title";
        titleEl.textContent = title;
        el.appendChild(titleEl);
      }

      hasNew = true;
    }

    if (hasNew) {
      try {
        GraphViewer.processElements();
        console.log("[Drawio] Diagramas inicializados via API nativa.");
      } catch (e) {
        console.error("[Drawio] Erro ao processar elementos mxgraph:", e);
      }
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initDrawio();
    });
  } else {
    document.addEventListener("DOMContentLoaded", initDrawio);
  }
})();
