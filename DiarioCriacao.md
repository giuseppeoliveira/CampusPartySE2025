# 📖 Diário de Criação 

> Por Giuseppe Oliveira - Campus Party SE 2025

## 🎯 Introdução

Este é o diário da **segunda versão** do meu projeto Companheiro Digital, criado especialmente para a Campus Party Sergipe 2025. Aqui vou contar dia a dia como foi o processo, os desafios enfrentados e o que aprendi em cada etapa.

**Importante**: Este projeto foi desenvolvido por mim com ajuda de Inteligência Artificial para acelerar o desenvolvimento e me ensinar novas técnicas. A IA não fez tudo sozinha - ela foi uma ferramenta para me ajudar a aprender e implementar funcionalidades mais avançadas.

---

## 🗓️ Mapa de Progressão - Dia a Dia

### 📅 **Dia 1: Planejamento e Design**
**Desafio**: Criar um chatbot que realmente ajudasse as pessoas com serviços do governo
- **O que fiz**: 
  - Pesquisei os principais problemas que as pessoas têm ao acessar sites gov.br
  - Criei wireframes no papel de como seria a interface
  - Defini que seria um chat com voz para ser mais acessível
- **O que aprendi**: A importância de entender o problema antes de programar
- **Resultado**: Conceito claro do que queria construir

### 📅 **Dia 2: Design no Figma**
**Desafio**: Transformar a ideia em um design visual profissional
- **O que fiz**:
  - Abri o Figma pela primeira vez (nunca tinha usado)
  - Criei a tela de boas-vindas com logo e cores do governo
  - Desenhei a interface do chat com bolhas de mensagem
  - Pensei na disposição dos botões de voz e FAQ
- **O que aprendi**: Como usar ferramentas de design e a importância do UX
- **Resultado**: Protótipo visual completo para seguir

### 📅 **Dia 3: Configuração Inicial**
**Desafio**: Começar o projeto do zero com as tecnologias certas
- **O que fiz**:
  - Instalei Node.js e configurei o ambiente
  - Criei o projeto usando Vite + React + TypeScript
  - Instalei shadcn/ui e Tailwind CSS (primeira vez usando)
  - Configurei ESLint e estrutura de pastas
- **O que aprendi**: Como configurar um projeto moderno do React
- **Resultado**: Base sólida para começar a programar

### 📅 **Dia 4: Componentes Básicos**
**Desafio**: Transformar o design do Figma em código React
- **O que fiz**:
  - Criei o componente WelcomeScreen seguindo o design
  - Implementei o ChatScreen com estado básico
  - Usei useState pela primeira vez de forma mais avançada
  - Estilizei tudo com Tailwind CSS
- **O que aprendi**: Como componentizar uma aplicação React
- **Resultado**: Interface visual funcionando

### 📅 **Dia 5: Sistema de FAQ**
**Desafio**: Criar uma base de conhecimento inteligente
- **O que fiz**:
  - Pesquisei os principais serviços gov.br (CPF, INSS, SUS)
  - Criei um arquivo com 15+ perguntas e respostas detalhadas
  - Implementei algoritmo de busca por palavras-chave
  - Adicionei links clicáveis nas respostas
- **O que aprendi**: Como estruturar dados e criar algoritmos de busca
- **Resultado**: Chatbot que respondia perguntas básicas

### 📅 **Dia 6: IA Interpretativa**
**Desafio**: Fazer o bot entender perguntas em linguagem natural
- **O que fiz**:
  - Estudei como criar padrões de interpretação
  - Implementei função que "traduz" pergunta informal para busca
  - Ex: "quero fazer meu documento" → busca por "CPF", "RG", etc.
  - Testei com várias formas diferentes de perguntar
- **O que aprendi**: Lógica de processamento de linguagem natural básica
- **Resultado**: Bot mais inteligente que entendia jeito de falar brasileiro

### 📅 **Dia 7: Reconhecimento de Voz**
**Desafio**: Implementar Speech-to-Text sem APIs externas
- **O que fiz**:
  - Descobri a Web Speech API do navegador
  - Criei hook customizado useVoiceInteraction
  - Implementei botão de microfone no input
  - Tratei permissões e erros de microfone
- **O que aprendi**: Como usar APIs nativas do navegador
- **Resultado**: Usuário podia falar perguntas ao invés de digitar

### 📅 **Dia 8: Síntese de Voz**
**Desafio**: Fazer o bot "falar" as respostas
- **O que fiz**:
  - Usei Web Speech Synthesis API
  - Criei botões de play/pause para cada resposta
  - Adicionei configurações de velocidade e tom
  - Implementei controles de volume
- **O que aprendi**: Acessibilidade e importância do áudio
- **Resultado**: Experiência completa de conversação por voz

### 📅 **Dia 9: Refatoração e Clean Code**
**Desafio**: Organizar o código que estava ficando bagunçado
- **O que fiz**:
  - Separei componentes grandes em componentes menores
  - Criei hooks customizados para lógica complexa
  - Organizei pastas por responsabilidade
  - Adicionei tipos TypeScript em tudo
- **O que aprendi**: Princípios de Clean Architecture e organização
- **Resultado**: Código muito mais limpo e fácil de entender

### 📅 **Dia 10: Testes e Qualidade**
**Desafio**: Garantir que o código funcionasse corretamente
- **O que fiz**:
  - Configurei Vitest para testes unitários
  - Escrevi testes para funções de FAQ e busca
  - Testei componentes com Testing Library
  - Configurei cobertura de código
- **O que aprendi**: Importância dos testes para projetos sérios
- **Resultado**: Projeto com qualidade profissional

### 📅 **Dia 11: Funcionalidades Avançadas**
**Desafio**: Implementar diferenciação entre tipos de FAQ
- **O que fiz**:
  - Criei dois tipos de botão FAQ diferentes
  - Um mostra dropdown rápido, outro tela completa
  - Implementei auto-scroll para respostas
  - Corrigi bugs do microfone que "prendia" o texto
- **O que aprendi**: UX avançada e detalhes fazem diferença
- **Resultado**: Interface mais profissional e fácil de usar

### 📅 **Dia 12: Conversão para Mobile (APK)**
**Desafio**: Transformar em aplicativo Android real
- **O que fiz**:
  - Instalei Capacitor no projeto
  - Configurei build para Android
  - Abri Android Studio pela primeira vez
  - Gerei APK e testei no celular
- **O que aprendi**: Como converter webapp em app nativo
- **Resultado**: APK funcionando perfeitamente no Android

### 📅 **Dia 13: Deploy e GitHub**
**Desafio**: Publicar o projeto para o mundo ver
- **O que fiz**:
  - Organizei branches (main, prod, dev)
  - Fiz commits organizados com mensagens claras
  - Subi tudo para GitHub
  - Configurei README e documentação
- **O que aprendi**: Importância do Git e documentação
- **Resultado**: Projeto público e profissional

---

## 🎓 Principais Aprendizados

1. **Design First**: Planejar no Figma economizou muito tempo de desenvolvimento
2. **TypeScript**: Apesar de mais complicado, evita muitos bugs
3. **Clean Architecture**: Código organizado é mais fácil de manter
4. **APIs Nativas**: Navegador já tem muita coisa útil (voz, microfone)
5. **Testes**: Investir tempo em testes evita problemas futuros
6. **IA como Ferramenta**: IA me ajudou a aprender mais rápido, não fez por mim

## 🔧 Ferramentas que Dominei

- **Figma**: Design e prototipação
- **React + TypeScript**: Desenvolvimento frontend moderno
- **Vite**: Build tool rápido
- **Tailwind CSS**: Estilização utility-first
- **shadcn/ui**: Componentes prontos e bonitos
- **Web APIs**: Speech Recognition e Synthesis
- **Capacitor**: Conversão para mobile
- **Android Studio**: Build de APK
- **Git/GitHub**: Controle de versão profissional

## 🎯 Por que Este Projeto é Especial

Este não é só um chatbot comum. É um projeto que:
- **Resolve problema real** dos brasileiros com sites gov.br
- **Usa tecnologia de ponta** (voz, IA, mobile)
- **Tem código profissional** com testes e documentação
- **É acessível** para pessoas com dificuldades de leitura/digitação
- **Mostra evolução** de um desenvolvedor aprendendo

---

*Giuseppe Oliveira - Campus Party SE 2025*  
*"Programar é resolver problemas reais das pessoas"*
