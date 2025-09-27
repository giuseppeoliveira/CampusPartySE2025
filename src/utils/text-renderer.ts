/**
 * Text Rendering Utilities
 * Helper functions for text processing following clean code principles
 */

import { URL_PATTERNS } from '../constants';

export interface TextPart {
  text: string;
  isLink: boolean;
  url?: string;
}

/**
 * Text processing utilities
 */
export class TextRenderer {
  /**
   * Splits text into parts identifying links
   */
  static parseTextWithLinks(text: string): TextPart[] {
    const parts = text.split(URL_PATTERNS.URL_REGEX);
    const results: TextPart[] = [];
    
    parts.forEach(part => {
      if (part.match(URL_PATTERNS.URL_REGEX)) {
        results.push({
          text: part,
          isLink: true,
          url: part.startsWith('http') ? part : `https://${part}`
        });
      } else if (part) {
        results.push({
          text: part,
          isLink: false
        });
      }
    });
    
    return results;
  }

  /**
   * Parses formatted text lines for markdown-like rendering
   */
  static parseFormattedLines(text: string): FormattedLine[] {
    const lines = text.split('\n');
    
    return lines.map(line => {
      if (!line.trim()) {
        return { type: 'empty', content: '' };
      }
      
      if (line.includes('**') && line.includes(':**')) {
        return { type: 'bold-title', content: line };
      }
      
      if (this.isListItem(line)) {
        return { type: 'list-item', content: line };
      }
      
      if (this.isSubItem(line)) {
        return { type: 'sub-item', content: line };
      }
      
      return { type: 'normal', content: line };
    });
  }

  /**
   * Extracts bold text information
   */
  static parseBoldTitle(line: string): BoldTitleParts {
    const boldMatch = line.match(/\*\*(.*?)\*\*/);
    if (!boldMatch) {
      return { beforeBold: line, boldText: '', afterBold: '' };
    }
    
    const beforeBold = line.substring(0, line.indexOf('**'));
    const boldText = boldMatch[1];
    const afterBold = line.substring(line.indexOf('**') + boldMatch[0].length);
    
    return { beforeBold, boldText, afterBold };
  }

  /**
   * Parses list item content
   */
  static parseListItem(line: string): ListItemParts {
    const trimmedLine = line.trim();
    const bulletMatch = trimmedLine.match(/^(•|1️⃣|2️⃣|3️⃣|4️⃣)\s+(.+)$/);
    
    if (!bulletMatch) {
      return { bullet: '', content: line };
    }
    
    return {
      bullet: bulletMatch[1],
      content: bulletMatch[2]
    };
  }

  /**
   * Parses sub-item content
   */
  static parseSubItem(line: string): string {
    return line.trim().substring(1).trim(); // Remove bullet and trim
  }

  private static isListItem(line: string): boolean {
    const trimmed = line.trim();
    return trimmed.startsWith('•') || 
           trimmed.startsWith('1️⃣') || 
           trimmed.startsWith('2️⃣') || 
           trimmed.startsWith('3️⃣') || 
           trimmed.startsWith('4️⃣');
  }

  private static isSubItem(line: string): boolean {
    return line.startsWith('   •') || line.startsWith('  •');
  }
}

export interface FormattedLine {
  type: 'empty' | 'bold-title' | 'list-item' | 'sub-item' | 'normal';
  content: string;
}

export interface BoldTitleParts {
  beforeBold: string;
  boldText: string;
  afterBold: string;
}

export interface ListItemParts {
  bullet: string;
  content: string;
}