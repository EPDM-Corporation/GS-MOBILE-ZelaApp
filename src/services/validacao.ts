export const validarPonto = (descricao: string): string | null => {
    const limpo = descricao.trim();
    if (limpo.length === 0) return 'Descreva o problema.';
    if (limpo.length < 10) return 'Use pelo menos 10 caracteres.';
    return null;
};

export const validarCadastro = (usuario: string, senha: string): string | null => {
    if (usuario.trim().length < 3) return 'O usuário precisa de 3+ caracteres.';
    if (senha.length < 6) return 'A senha precisa de 6+ caracteres.';
    return null;
};

export const validarComentario = (texto: string): string | null =>
    texto.trim().length === 0 ? 'Escreva algo antes de enviar.' : null;

export const validarUsuario = (usuario: string): string =>
    usuario.trim().length < 3 ? 'Usuário com mínimo de 3 letras' : '';

export const validarSenha = (senha: string): string =>
    senha.trim().length < 6 ? 'Senha no mínimo de 6 letras' : '';

export const validarConfirmacao = (senha: string, confirmacao: string): string =>
    senha !== confirmacao ? 'Senha não é a mesma' : '';