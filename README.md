# 🏛️ Campus PArt - Projeto 2

> Chatbot inteligente especializado em serviços governamentais brasileiros desenvolvido para a Campus Party SE 2025

## � O que é este projeto?

O **Campus PArt - Projeto 2** é um assistente digital que ajuda brasileiros a navegar pelos serviços do governo federal. Ele entende perguntas em linguagem natural e fornece respostas precisas sobre CPF, INSS, SUS, Receita Federal e muito mais.

### ✨ Principais funcionalidades:
- 🤖 **Chat inteligente** com respostas baseadas em dados oficiais
- 🎤 **Reconhecimento de voz** - fale suas perguntas
- 🔊 **Síntese de voz** - escute as respostas
- � **Links diretos** para sites oficiais do governo
- 📱 **Interface responsiva** - funciona no celular e computador

## � Como executar o projeto

### Pré-requisitos
- Node.js 18+ instalado
- Git instalado

### Passo a passo:

1. **Clone o repositório**
```bash
git clone https://github.com/giuseppeoliveira/CampusPartySE2025.git
cd CampusPartySE2025
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

### Outros comandos úteis:

```bash
# Executar testes
npm run test

# Verificar tipos TypeScript
npm run type-check

# Build para produção
npm run build

# Visualizar build de produção
npm run preview
```

## 📱 Versão Mobile (APK)

Este projeto também foi convertido em aplicativo Android usando Capacitor e Android Studio. Para gerar o APK:

```bash
# Build para produção
npm run build

# Gerar projeto Android
npx cap add android
npx cap copy android

# Abrir no Android Studio
npx cap open android
```

## 🛠️ Tecnologias utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **UI/UX**: Tailwind CSS + shadcn/ui + Lucide Icons
- **Voz**: Web Speech API (STT + TTS)
- **Mobile**: Capacitor + Android Studio
- **Testes**: Vitest + Testing Library
- **Qualidade**: ESLint + TypeScript

## 🎯 Campus Party SE 2025

Este projeto foi desenvolvido especialmente para a **Campus Party Sergipe 2025**, demonstrando:
- Integração com APIs nativas do navegador
- Clean Architecture e boas práticas
- Interface acessível e intuitiva
- Conversão para aplicativo móvel

## 🤝 Contribuições

Projeto desenvolvido por **Giuseppe Oliveira** com auxílio de IA para acelerar o desenvolvimento e implementação de funcionalidades avançadas.

---

� **Dica**: Experimente falar "Como fazer CPF online?" no microfone!
