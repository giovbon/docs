function enforceUnlockDate() {
    const unlockEl = document.querySelector('[data-unlock-date]');
    if (!unlockEl) return;

    const rawDate = (unlockEl.getAttribute('data-unlock-date') || '').trim();
    if (!rawDate) return;

    let unlockDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        const [year, month, day] = rawDate.split('-').map(Number);
        unlockDate = new Date(Date.UTC(year, month - 1, day));
    } else {
        const parsed = Date.parse(rawDate);
        if (Number.isNaN(parsed)) {
            console.warn('unlock-date inválido:', rawDate);
            return;
        }
        unlockDate = new Date(parsed);
        unlockDate = new Date(Date.UTC(unlockDate.getFullYear(), unlockDate.getMonth(), unlockDate.getDate()));
    }

    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    if (today < unlockDate) {
        const message = `Esta página só pode ser acessada em ${unlockDate.toISOString().slice(0, 10)} ou depois. Hoje é ${today.toISOString().slice(0, 10)}.`;

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = 'rgba(0, 0, 0, 0.8)';
        overlay.style.backdropFilter = 'blur(4px)';
        overlay.style.color = '#ffffff';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.textAlign = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.padding = '2rem';
        overlay.style.fontFamily = 'Roboto, system-ui, -apple-system, Segoe UI, sans-serif';

        const card = document.createElement('div');
        card.style.maxWidth = '600px';
        card.style.background = 'rgba(255, 255, 255, 0.08)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        card.style.borderRadius = '12px';
        card.style.padding = '1.5rem';
        card.style.backdropFilter = 'blur(10px)';

        const title = document.createElement('h1');
        title.textContent = '🔒';
        title.style.margin = '0 0 0.75rem';
        title.style.fontSize = '1.6rem';

        const text = document.createElement('p');
        text.textContent = message;
        text.style.margin = '0 0 1rem';
        text.style.fontSize = '1.1rem';

        const button = document.createElement('button');
        button.textContent = 'Voltar';
        button.style.padding = '0.6rem 1rem';
        button.style.fontSize = '1rem';
        button.style.cursor = 'pointer';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.background = '#ff9800';
        button.style.color = '#222';

        button.addEventListener('click', () => {
            if (document.referrer && document.referrer !== window.location.href) {
                window.location.href = document.referrer;
            } else {
                window.location.href = '/';
            }
        });

        const unlockInfo = document.createElement('p');
        unlockInfo.style.margin = '1rem 0 0.4rem';
        unlockInfo.style.fontSize = '1rem';

        const codeInput = document.createElement('input');
        codeInput.type = 'password';
        codeInput.maxLength = 6;
        codeInput.placeholder = 'Senha para liberar acesso antes';
        codeInput.style.padding = '0.5rem';
        codeInput.style.fontSize = '1rem';
        codeInput.style.width = '100%';
        codeInput.style.marginBottom = '0.5rem';
        codeInput.style.borderRadius = '6px';
        codeInput.style.border = '1px solid rgba(255,255,255,0.5)';

        const errorMsg = document.createElement('p');
        errorMsg.style.color = '#ffb3b3';
        errorMsg.style.margin = '0 0 0.5rem';
        errorMsg.style.minHeight = '1.25rem';
        errorMsg.style.fontSize = '0.95rem';

        let attempts = 0;

        const tryUnlock = () => {
            const code = (codeInput.value || '').trim();
            if (code === '1q2w3e') {
                document.body.removeChild(overlay);
                document.documentElement.style.overflow = '';
                return;
            }
            attempts++;
            if (attempts >= 3) {
                window.location.href = '/';
                return;
            }
            errorMsg.textContent = `Senha inválida (${attempts}/3)`;
        };

        codeInput.addEventListener('input', () => {
            if (codeInput.value.length === 6) {
                tryUnlock();
            }
        });

        // Block Reveal.js keyboard shortcuts when overlay is active, but allow typing in password input
        overlay.addEventListener('keydown', (e) => {
            const revealShortcuts = ['f', 'o', 'n', 'p', 'h', 'v', 'c', 'b', 'r', 't', 's', 'm', 'e', 'q', 'escape'];
            if (e.target !== codeInput && revealShortcuts.includes(e.key.toLowerCase())) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(unlockInfo);
        card.appendChild(codeInput);
        card.appendChild(errorMsg);
        card.appendChild(button);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Auto-focus on password input
        codeInput.focus();

        document.documentElement.style.overflow = 'hidden';
        return;
    }
}

function initAccessControl() {
    enforceUnlockDate();
}

if (typeof document$ !== 'undefined') {
    document$.subscribe(initAccessControl);
} else {
    document.addEventListener('DOMContentLoaded', initAccessControl);
}
