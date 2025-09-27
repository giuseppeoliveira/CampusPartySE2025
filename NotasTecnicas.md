# 🔧 Notas Técnicas - Campus PArt Projeto 2

> Documentação técnica completa por Giuseppe Oliveira

## 🏗️ Arquitetura do Sistema

### Paradigmas e Padrões Utilizados
- **Clean Architecture**: Separação clara de responsabilidades
- **Component-Based Architecture**: React com componentes reutilizáveis
- **Hook Pattern**: Lógica customizada em hooks
- **Composition over Inheritance**: Composição de funcionalidades
- **Functional Programming**: Funções puras sempre que possível

### Estrutura de Pastas
```
├── components/          # Componentes React organizados
│   ├── ui/             # Componentes base reutilizáveis
│   └── *.tsx           # Componentes específicos da aplicação
├── src/
│   ├── components/     # Componentes organizados por feature
│   ├── hooks/          # Hooks customizados
│   ├── types/          # Definições TypeScript
│   ├── utils/          # Funções utilitárias
│   └── main.tsx        # Entry point
├── styles/             # Estilos globais CSS
└── public/            # Assets estáticos
```

---

## 📦 Dependencies e Tecnologias

### Core Framework
```json
{
  "react": "^18.3.1",           # Framework UI
  "react-dom": "^18.3.1",      # Renderização DOM
  "typescript": "^5.5.3",      # Tipagem estática
  "vite": "^5.4.8"             # Build tool moderna
}
```

### UI e Styling
```json
{
  "tailwindcss": "^3.4.13",    # CSS utility-first
  "lucide-react": "^0.446.0",  # Ícones SVG
  "@radix-ui/*": "^1.x",       # Componentes acessíveis
  "shadcn/ui": "custom"        # Design system
}
```

### Mobile e PWA
```json
{
  "@capacitor/core": "^6.1.2",     # Bridge nativo
  "@capacitor/android": "^6.1.2",  # Platform Android
  "@capacitor/cli": "^6.1.2"       # CLI tools
}
```

### Testes e Qualidade
```json
{
  "vitest": "^2.1.2",              # Test runner
  "@testing-library/react": "^16.0.1",  # Testes de componentes
  "eslint": "^9.11.1",             # Linting
  "@typescript-eslint/*": "^8.8.0" # TypeScript linting
}
```

---

## 🧠 Algoritmos Implementados

### 1. Algoritmo de Interpretação de IA
```typescript
// Padrão de análise semântica simples
const interpretQuestion = (question: string): InterpretationResult => {
  const patterns = [
    { keywords: ['cpf', 'documento'], category: 'Documentos' },
    { keywords: ['inss', 'aposentadoria'], category: 'Previdência' },
    // ... mais padrões
  ];
  
  return findBestMatch(question.toLowerCase(), patterns);
};
```

### 2. Algoritmo de Busca Fuzzy
```typescript
// Sistema de pontuação por relevância
const searchFAQ = (query: string): FAQSearchResult[] => {
  return faqData
    .map(item => ({
      item,
      score: calculateRelevanceScore(query, item)
    }))
    .filter(result => result.score > 0.3)
    .sort((a, b) => b.score - a.score);
};
```

### 3. Algoritmo de Renderização de Links
```typescript
// Regex para detectar URLs automaticamente
const linkRegex = /\b(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?\b/gi;

const renderTextWithLinks = (text: string) => {
  return text.replace(linkRegex, (url) => 
    `<a href="${formatUrl(url)}" target="_blank">${url}</a>`
  );
};
```

---

## 🎤 APIs e Integrações

### Web Speech API
```typescript
// Speech-to-Text (STT)
const recognition = new (window as any).webkitSpeechRecognition();
recognition.lang = 'pt-BR';
recognition.continuous = false;
recognition.interimResults = false;

// Text-to-Speech (TTS)
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'pt-BR';
utterance.rate = 0.9;
speechSynthesis.speak(utterance);
```

### Capacitor APIs
```typescript
// Configuração para Android
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.giuseppe.campuspart',
  appName: 'Campus PArt',
  webDir: 'dist',
  bundledWebRuntime: false
};
```

---

## 🧪 Estratégia de Testes

### Tipos de Teste Implementados

1. **Unit Tests**: Funções puras e lógica de negócio
```typescript
describe('FAQService', () => {
  test('deve interpretar pergunta sobre CPF', () => {
    const result = interpretQuestion('como fazer cpf');
    expect(result.category).toBe('Documentos');
  });
});
```

2. **Component Tests**: Renderização e interações
```typescript
test('ChatScreen deve renderizar corretamente', () => {
  render(<ChatScreen onBackToWelcome={jest.fn()} />);
  expect(screen.getByText('Companheiro Digital')).toBeInTheDocument();
});
```

3. **Integration Tests**: Fluxo completo de funcionalidades
```typescript
test('fluxo completo de pergunta e resposta', async () => {
  // Simula interação completa do usuário
});
```

### Cobertura de Código
- **Target**: 80%+ cobertura
- **Ferramentas**: Vitest + c8
- **Configuração**: `vitest.config.ts`

---

## 🎨 Técnicas de Clean Code

### 1. Nomeação Consistente
```typescript
// ✅ Bom: nomes descritivos
const handleFAQQuestionSelect = (question: string) => { };
const useVoiceInteraction = () => { };

// ❌ Ruim: nomes genéricos
const handle = (q: string) => { };
const useVoice = () => { };
```

### 2. Funções Pequenas e Focadas
```typescript
// ✅ Uma responsabilidade por função
const formatUrl = (url: string): string => {
  return url.startsWith('http') ? url : `https://${url}`;
};

const validateInput = (input: string): boolean => {
  return input.trim().length > 0;
};
```

### 3. Tipos TypeScript Bem Definidos
```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: FAQCategory;
  steps?: string[];
  relatedLinks?: RelatedLink[];
}
```

### 4. Componentes Reutilizáveis
```typescript
// Componente genérico e reutilizável
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

---

## 📱 Mobile Development (Capacitor)

### Configuração Android
```javascript
// capacitor.config.ts
export default {
  appId: 'com.giuseppe.campuspart',
  appName: 'Campus PArt',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6"
    }
  }
};
```

### Build Process
```bash
# 1. Build da aplicação web
npm run build

# 2. Sincronizar com Capacitor
npx cap sync android

# 3. Abrir no Android Studio
npx cap open android

# 4. Build APK no Android Studio
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

---

## 🔧 Configurações de Desenvolvimento

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./components")
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

### ESLint Rules
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
];
```

---

## 🚀 Performance e Otimizações

### Bundle Splitting
```typescript
// vite.config.ts - otimização de chunks
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog']
        }
      }
    }
  }
});
```

### Lazy Loading
```typescript
// Carregamento lazy de componentes pesados
const FAQCategories = lazy(() => import('./FAQCategories'));
const VoiceControls = lazy(() => import('./VoiceControls'));
```

### Memoization
```typescript
// Otimização com useMemo e useCallback
const memoizedFAQResults = useMemo(
  () => searchFAQ(searchTerm),
  [searchTerm]
);

const handleSearch = useCallback(
  (query: string) => setSearchTerm(query),
  []
);
```

---

## 🔐 Boas Práticas de Segurança

### Sanitização de Inputs
```typescript
const sanitizeInput = (input: string): string => {
  return input.replace(/<script[^>]*>.*?<\/script>/gi, '');
};
```

### Validação de URLs
```typescript
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

---

## 📊 Métricas e Monitoramento

### Build Size
- **Total**: ~396KB (comprimido)
- **Vendor**: ~280KB (React, dependências)
- **App Code**: ~116KB (código da aplicação)

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

---

*Notas técnicas compiladas por Giuseppe Oliveira*  
*Campus Party SE 2025*