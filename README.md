# 🏛️ Campus PArt - Projeto 2

> Sistema inteligente de assistência digital para serviços governamentais brasileiros

## 🚀 Funcionalidades

- **🤖 IA Interpretativa**: Compreende perguntas informais e as converte em consultas estruturadas
- **📚 FAQ Inteligente**: Base de conhecimento com respostas oficiais sobre serviços gov.br
- **🔗 Links Clicáveis**: Todos os links são automaticamente detectados e funcionais
- **📱 Interface Responsiva**: Design moderno com shadcn/ui e Tailwind CSS
- **🎯 Busca Avançada**: Algoritmo de pontuação para encontrar as melhores respostas

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS + Lucide Icons  
- **Testes**: Vitest + Testing Library
- **Linting**: ESLint + TypeScript
- **CI/CD**: GitHub Actions

## 📋 Branches

| Branch | Propósito | Status | Deploy |
|--------|-----------|---------|--------|
| `prod` | **🚀 Produção** | ✅ Estável | https://campus-part.vercel.app |
| `dev` | **🧪 Desenvolvimento** | ✅ Ativo | https://dev-campus-part.vercel.app |
| `main` | Backup histórico | 📦 Arquivado | - |
| `projeto-funcional` | Backup funcional | 📦 Preservado | - |
| `melhorias` | Features antigas | 📦 Merged | - |

### 🔄 Workflow das Branches:
1. **Desenvolvimento**: Trabalhe na branch `dev` 
2. **Teste**: Teste funcionalidades na `dev`
3. **Aprovação**: Após aprovação → merge para `prod`
4. **Deploy**: Auto-deploy para produção

## 🏗️ Pipelines CI/CD

### 🚀 Pipeline Principal (`ci-cd.yml`)
- **Triggers**: Push/PR para `prod` e `dev`
- **Jobs**:
  1. 🔍 **Lint & Type Check** - ESLint + TypeScript
  2. 🧪 **Unit Tests** - Vitest com cobertura
  3. 🏗️ **Build** - Compilação e artifacts
  4. 🔒 **Security Scan** - Auditoria de dependências
  5. 🚀 **Deploy** - Auto-deploy para dev e prod
  6. 📢 **Notification** - Status do pipeline

### 📊 Pipeline de Qualidade (`quality.yml`) 
- **Triggers**: Push, PR, schedule diário (2h UTC)
- **Jobs**:
  1. 📊 **Code Quality** - Análise ESLint e métricas
  2. 🧪 **Test Coverage** - Cobertura de testes  
  3. ⚡ **Performance** - Análise de bundle e performance
  4. 📦 **Dependencies** - Auditoria e atualizações

## 🚦 Status dos Pipelines

[![🚀 CI/CD Pipeline](https://github.com/username/campus-part-projeto-2/workflows/🚀%20CI/CD%20Pipeline/badge.svg)](https://github.com/username/campus-part-projeto-2/actions)

[![📊 Code Quality](https://github.com/username/campus-part-projeto-2/workflows/📊%20Code%20Quality%20&%20Performance/badge.svg)](https://github.com/username/campus-part-projeto-2/actions)

## 🚀 Como Executar

### Desenvolvimento Local
```bash
# 1. Instalar dependências
npm install

# 2. Executar em modo desenvolvimento
npm run dev

# 3. Abrir http://localhost:5173
```

### Testes
```bash
# Executar todos os testes
npm run test

# Testes com interface
npm run test:ui

# Testes com cobertura
npm run test:coverage
```

### Build de Produção
```bash
# Build
npm run build

# Preview do build
npm run preview
```

### Validação Completa
```bash
# Executa: type-check + lint + tests
npm run validate

# Pipeline completo (igual ao CI)
npm run ci
```

## 📁 Estrutura do Projeto

```
├── 📁 components/          # Componentes React
│   ├── 📄 ChatScreen.tsx   # Tela principal do chat
│   ├── 📄 FAQSystem.tsx    # Sistema de FAQ e IA
│   ├── 📄 WelcomeScreen.tsx # Tela de boas-vindas
│   └── 📁 ui/              # Componentes UI (shadcn)
├── 📁 lib/                 # Utilitários
├── 📁 src/                 # Código fonte principal
│   ├── 📄 main.tsx         # Entry point
│   └── 📁 test/            # Configuração de testes
├── 📁 styles/              # Estilos globais
├── 📁 .github/workflows/   # Pipelines CI/CD
├── 📄 package.json         # Dependências e scripts
├── 📄 vite.config.ts       # Configuração Vite
├── 📄 vitest.config.ts     # Configuração testes
└── 📄 tsconfig.json        # Configuração TypeScript
```

## 🧪 Testes

### Cobertura de Testes
- ✅ **FAQService**: Interpretação IA, busca FAQ, geração de respostas  
- ✅ **Componentes**: Renderização e interações
- ✅ **Links**: Detecção e funcionalidade de links clicáveis
- ✅ **Formatação**: Renderização de markdown

### Tipos de Teste
- **Unit Tests**: Lógica de negócio e funções puras
- **Component Tests**: Renderização e comportamento de componentes
- **Integration Tests**: Fluxo completo de perguntas e respostas

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Executar ESLint |
| `npm run lint:fix` | Corrigir problemas ESLint |
| `npm run test` | Executar testes |
| `npm run test:ui` | Testes com interface |
| `npm run test:coverage` | Testes com cobertura |
| `npm run type-check` | Verificação TypeScript |
| `npm run validate` | Validação completa |
| `npm run ci` | Pipeline CI local |

## 🎯 Próximas Etapas

- [ ] 📊 Implementar métricas de uso
- [ ] 🔍 Melhorar algoritmo de busca
- [ ] 📱 Otimização mobile
- [ ] 🎨 Temas personalizáveis
- [ ] 🔊 Síntese de voz real
- [ ] 📈 Analytics e relatórios

---

🚀 **Developed with ❤️ for Brazilian Government Services**
