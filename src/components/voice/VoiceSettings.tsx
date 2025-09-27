import { memo } from 'react';
import { Settings, Volume2, Mic, Speaker } from 'lucide-react';
import { useVoiceInteraction } from '../../hooks/useVoiceInteraction';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

interface VoiceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const VoiceSettings = memo<VoiceSettingsProps>(({
  isOpen,
  onClose,
  className = ''
}) => {
  const {
    voiceSettings,
    updateVoiceSettings,
    availableVoices,
    isSupported
  } = useVoiceInteraction();

  if (!isOpen) return null;

  const handleRateChange = (value: number[]) => {
    updateVoiceSettings({ rate: value[0] });
  };

  const handlePitchChange = (value: number[]) => {
    updateVoiceSettings({ pitch: value[0] });
  };

  const handleVolumeChange = (value: number[]) => {
    updateVoiceSettings({ volume: value[0] });
  };

  const handleVoiceChange = (voiceName: string) => {
    const selectedVoice = availableVoices.find(voice => voice.name === voiceName);
    updateVoiceSettings({ voice: selectedVoice || null });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <Card className="w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings size={20} />
            Configurações de Voz
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>

        <div className="space-y-6">
          {/* Text-to-Speech Settings */}
          {isSupported.tts && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Speaker size={16} />
                Síntese de Voz (TTS)
              </div>

              {/* Voice Selection */}
              {availableVoices.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="voice-select" className="text-sm">
                    Voz:
                  </Label>
                  <Select
                    value={voiceSettings.voice?.name || ''}
                    onValueChange={handleVoiceChange}
                  >
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder="Selecione uma voz" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Rate Control */}
              <div className="space-y-2">
                <Label className="text-sm flex items-center justify-between">
                  Velocidade:
                  <span className="font-mono text-xs">{voiceSettings.rate.toFixed(1)}x</span>
                </Label>
                <Slider
                  value={[voiceSettings.rate]}
                  onValueChange={handleRateChange}
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Lenta</span>
                  <span>Normal</span>
                  <span>Rápida</span>
                </div>
              </div>

              {/* Pitch Control */}
              <div className="space-y-2">
                <Label className="text-sm flex items-center justify-between">
                  Tom:
                  <span className="font-mono text-xs">{voiceSettings.pitch.toFixed(1)}</span>
                </Label>
                <Slider
                  value={[voiceSettings.pitch]}
                  onValueChange={handlePitchChange}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Grave</span>
                  <span>Normal</span>
                  <span>Agudo</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <Label className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Volume2 size={14} />
                    Volume:
                  </span>
                  <span className="font-mono text-xs">{Math.round(voiceSettings.volume * 100)}%</span>
                </Label>
                <Slider
                  value={[voiceSettings.volume]}
                  onValueChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.05}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Speech-to-Text Settings */}
          {isSupported.stt && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium border-t pt-4">
                <Mic size={16} />
                Reconhecimento de Voz (STT)
              </div>
              
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p className="mb-2">✅ Reconhecimento configurado para Português (Brasil)</p>
                <p className="text-xs text-gray-500">
                  O reconhecimento de voz funciona melhor em ambientes silenciosos.
                  Fale claramente e próximo ao microfone.
                </p>
              </div>
            </div>
          )}

          {/* Not Supported Warning */}
          {(!isSupported.tts && !isSupported.stt) && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">
                Funcionalidades de voz não suportadas neste navegador.
              </p>
              <p className="text-xs text-gray-400">
                Recomendamos usar Chrome ou Edge para melhor compatibilidade.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                updateVoiceSettings({
                  rate: 1,
                  pitch: 1,
                  volume: 0.8,
                  voice: availableVoices.find(v => v.lang.startsWith('pt')) || null
                });
              }}
              disabled={!isSupported.tts}
            >
              Restaurar Padrão
            </Button>
            <Button onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
});

VoiceSettings.displayName = 'VoiceSettings';