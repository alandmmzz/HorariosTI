import { BookOpen } from 'pixelarticons/react/BookOpen.js'
import { Terminal } from 'pixelarticons/react/Terminal.js'
import { Database } from 'pixelarticons/react/Database.js'
import { Server } from 'pixelarticons/react/Server.js'
import { CommentText } from 'pixelarticons/react/CommentText.js'
import { Message } from 'pixelarticons/react/Message.js'
import { Briefcase } from 'pixelarticons/react/Briefcase.js'
import { Building } from 'pixelarticons/react/Building.js'
import { Trophy } from 'pixelarticons/react/Trophy.js'
import { Heart } from 'pixelarticons/react/Heart.js'
import { Target } from 'pixelarticons/react/Target.js'
import { Flag } from 'pixelarticons/react/Flag.js'
import { Star } from 'pixelarticons/react/Star.js'
import { Coffee } from 'pixelarticons/react/Coffee.js'
import { Cpu } from 'pixelarticons/react/Cpu.js'
import { Gamepad } from 'pixelarticons/react/Gamepad.js'
import { Music } from 'pixelarticons/react/Music.js'
import { Presentation } from 'pixelarticons/react/Presentation.js'
import { Users } from 'pixelarticons/react/Users.js'
import { Home } from 'pixelarticons/react/Home.js'
import { Globe } from 'pixelarticons/react/Globe.js'
import { Clock } from 'pixelarticons/react/Clock.js'
import { Notebook } from 'pixelarticons/react/Notebook.js'
import { Bookmark } from 'pixelarticons/react/Bookmark.js'

export const ICONS = {
  'book-open': { label: 'Libro', Icon: BookOpen },
  terminal: { label: 'Terminal', Icon: Terminal },
  database: { label: 'Base de datos', Icon: Database },
  server: { label: 'Servidor', Icon: Server },
  'comment-text': { label: 'Conversación', Icon: CommentText },
  message: { label: 'Mensaje', Icon: Message },
  briefcase: { label: 'Maletín', Icon: Briefcase },
  building: { label: 'Edificio', Icon: Building },
  trophy: { label: 'Trofeo', Icon: Trophy },
  heart: { label: 'Corazón', Icon: Heart },
  target: { label: 'Objetivo', Icon: Target },
  flag: { label: 'Bandera', Icon: Flag },
  star: { label: 'Estrella', Icon: Star },
  coffee: { label: 'Café', Icon: Coffee },
  cpu: { label: 'CPU', Icon: Cpu },
  gamepad: { label: 'Joystick', Icon: Gamepad },
  music: { label: 'Música', Icon: Music },
  presentation: { label: 'Presentación', Icon: Presentation },
  users: { label: 'Grupo', Icon: Users },
  home: { label: 'Casa', Icon: Home },
  globe: { label: 'Idiomas', Icon: Globe },
  clock: { label: 'Reloj', Icon: Clock },
  notebook: { label: 'Cuaderno', Icon: Notebook },
  bookmark: { label: 'Marcador', Icon: Bookmark },
}

export const ICON_ORDER = Object.keys(ICONS)

export function getIcon(key) {
  return ICONS[key]?.Icon ?? ICONS['book-open'].Icon
}
