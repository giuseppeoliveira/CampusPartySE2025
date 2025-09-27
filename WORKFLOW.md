# 🔄 Workflow de Desenvolvimento

## 📋 Estrutura das Branches

```
prod (🚀 Produção)
  ↑
  │ (apenas quando aprovado)
  │
dev (🧪 Desenvolvimento) ← VOCÊ ESTÁ AQUI
```

## 🎯 Regras de Trabalho

### 🧪 Branch `dev` (Desenvolvimento)
- **Propósito**: Desenvolvimento e testes de novas funcionalidades
- **Deploy**: Automático para ambiente de desenvolvimento
- **URL**: https://dev-campus-part.vercel.app
- **Quando usar**: Sempre para desenvolvimento e testes

### 🚀 Branch `prod` (Produção)
- **Propósito**: Código estável e aprovado para produção
- **Deploy**: Automático para ambiente de produção
- **URL**: https://campus-part.vercel.app
- **Quando usar**: Apenas após aprovação do código

## 🔄 Fluxo de Trabalho

### 1. 🛠️ Desenvolvimento
```bash
# Certifique-se de estar na branch dev
git checkout dev

# Trabalhe nas suas funcionalidades
# ... código ...

# Teste localmente
npm run dev
```

### 2. ✅ Commit e Teste
```bash
# Quando funcionar corretamente, faça commit
git add .
git commit -m "✨ Nova funcionalidade implementada"
git push origin dev

# ✅ Deploy automático para DEV acontece
```

### 3. 🚀 Aprovação para Produção
```bash
# APENAS quando eu autorizar:
git checkout prod
git merge dev
git push origin prod

# ✅ Deploy automático para PROD acontece
```

## ⚡ Comandos Rápidos

```bash
# Ver branch atual
git branch

# Ir para dev (desenvolvimento)
git checkout dev

# Ir para prod (produção)
git checkout prod

# Status do projeto
git status

# Ver último commit
git log --oneline -1
```

## 🔒 Regras Importantes

1. **❌ NUNCA** commite direto na `prod`
2. **✅ SEMPRE** trabalhe na `dev`
3. **🧪 SEMPRE** teste na `dev` antes de aprovar
4. **🚀 APENAS** eu autorizo merge para `prod`
5. **📱 SEMPRE** teste mobile e desktop

## 🚦 Status Atual

- **Branch Ativa**: `dev` ← Você está aqui
- **Próximo Deploy**: Automático quando commitar na `dev`
- **Ambiente de Teste**: https://dev-campus-part.vercel.app