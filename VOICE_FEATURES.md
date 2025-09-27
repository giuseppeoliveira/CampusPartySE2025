# 🎤 Funcionalidades de Voz - Campus PArt

## 📋 Resumo das Funcionalidades

Este projeto agora inclui funcionalidades completas de **Text-to-Speech (TTS)** e **Speech-to-Text (STT)** usando as Web APIs nativas do navegador.

## 🔊 Text-to-Speech (TTS) - Escutar Respostas

### Como Usar
- **Botão de Volume** aparece em cada resposta da IA
- Clique no botão 🔊 para escutar a resposta
- Durante a reprodução:
  - ⏸️ **Pause** - Pausar a leitura
  - ▶️ **Play** - Continuar a leitura
  - ⏹️ **Stop** - Parar completamente

### Configurações Disponíveis
- **Velocidade**: 0.1x a 3.0x (padrão: 1.0x)
- **Tom**: Grave a Agudo (0 a 2)
- **Volume**: 0% a 100% (padrão: 80%)
- **Voz**: Seleção entre vozes disponíveis no sistema

## 🎙️ Speech-to-Text (STT) - Enviar Áudio

### Como Usar
- **Botão de Microfone** 🎤 no campo de entrada
- Clique para iniciar a gravação (botão fica vermelho e animado)
- Fale sua pergunta claramente
- Clique novamente para parar
- O texto é automaticamente inserido no campo

### Configurações
- **Idioma**: Português (Brasil) por padrão
- **Detecção**: Contínua com resultados parciais
- **Qualidade**: Funciona melhor em ambientes silenciosos

## ⚙️ Configurações Avançadas

### Acesso às Configurações
- Botão **Configurações** ⚙️ nos controles de voz
- Modal com todas as opções disponíveis
- Botão "Restaurar Padrão" para voltar às configurações iniciais

### Configurações TTS
```
Rate (Velocidade): 0.1 - 3.0
Pitch (Tom): 0.0 - 2.0  
Volume: 0.0 - 1.0
Voice: Lista de vozes do sistema
```

### Configurações STT
- Idioma: pt-BR (fixo)
- Modo: Intermitente (para frases curtas)
- Resultados intermediários: Habilitado

## 🌐 Compatibilidade de Navegadores

### ✅ Totalmente Suportado
- **Chrome** 33+
- **Edge** 14+
- **Safari** 14.1+
- **Opera** 20+

### ⚠️ Parcialmente Suportado
- **Firefox** (apenas TTS, STT em desenvolvimento)

### ❌ Não Suportado
- Internet Explorer
- Navegadores muito antigos

## 🔧 Implementação Técnica

### Arquivos Principais
```
src/hooks/useVoiceInteraction.ts     # Hook principal
src/components/voice/VoiceControls.tsx    # Controles de voz
src/components/voice/VoiceSettings.tsx    # Modal de configurações
src/types/speech.d.ts                     # Tipos TypeScript
```

### Web APIs Utilizadas
- **SpeechSynthesis API** - Text-to-Speech
- **SpeechRecognition API** - Speech-to-Text
- **MediaDevices API** - Acesso ao microfone

## 🚀 Como Testar

### 1. Teste TTS (Escutar)
1. Faça uma pergunta no chat
2. Clique no ícone 🔊 na resposta da IA
3. Teste os controles: pause, play, stop
4. Abra configurações ⚙️ e ajuste velocidade/volume

### 2. Teste STT (Falar)
1. Clique no ícone 🎤 no campo de entrada
2. Permita acesso ao microfone (se solicitado)
3. Diga: "Como fazer CPF online?"
4. Observe o texto aparecer automaticamente
5. Envie a mensagem normalmente

### 3. Teste Completo
1. Diga uma pergunta usando STT
2. Escute a resposta usando TTS
3. Ajuste as configurações conforme necessário

## 🎯 Casos de Uso

### Acessibilidade
- **Usuários com deficiência visual**: Podem escutar todas as respostas
- **Usuários com dificuldades motoras**: Podem usar comandos de voz
- **Idosos**: Interface mais amigável para tecnologia

### Conveniência
- **Multitarefa**: Escutar enquanto faz outras atividades
- **Mobile**: Mais fácil falar que digitar no celular
- **Velocidade**: Comunicação mais rápida por voz

## 🔍 Solução de Problemas

### Microfone Não Funciona
1. Verifique permissões do navegador
2. Teste em outro navegador (Chrome recomendado)
3. Verifique se o microfone está funcionando
4. Recarregue a página se necessário

### Voz Não Reproduz
1. Verifique se o volume do sistema está ligado
2. Teste outras vozes nas configurações
3. Ajuste o volume nas configurações de voz
4. Reinicie o navegador se necessário

### Performance
- Use apenas uma funcionalidade por vez
- Em dispositivos lentos, reduza a velocidade da fala
- Feche outras abas consumindo áudio/microfone

## 📊 Estatísticas de Uso

As funcionalidades incluem:
- ✅ 7 controles TTS (play, pause, stop, volume, velocidade, tom, voz)
- ✅ 3 controles STT (start, stop, transcript display)
- ✅ 12 configurações personalizáveis
- ✅ Suporte a 20+ idiomas (depende do sistema)
- ✅ Feedback visual em tempo real
- ✅ Tratamento completo de erros

---

**🎉 Implementação Completa! Todas as funcionalidades de voz estão funcionais e prontas para uso.**