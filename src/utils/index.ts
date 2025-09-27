/**
 * Utility functions following clean code principles
 * Pure functions with single responsibilities
 */

import { Message } from '../types';

/**
 * WhatsApp sharing utilities
 */
export const WhatsAppUtils = {
  /**
   * Generates shareable WhatsApp text from message
   */
  generateShareText(message: Message): string {
    let shareText = `🇧🇷 Companheiro Digital Gov.br\n\n`;
    
    if (message.faqItem) {
      shareText += `❓ ${message.faqItem.question}\n\n`;
      shareText += `💡 ${message.faqItem.answer}\n\n`;
      
      if (message.faqItem.steps?.length) {
        shareText += `📋 Passo a passo:\n`;
        message.faqItem.steps.forEach((step, index) => {
          shareText += `${index + 1}. ${step}\n`;
        });
        shareText += `\n`;
      }
      
      if (message.faqItem.relatedLinks?.length) {
        shareText += `🔗 Links úteis:\n`;
        message.faqItem.relatedLinks.forEach(link => {
          shareText += `• ${link.text}: ${link.url}\n`;
        });
      }
    } else {
      shareText += message.text;
    }
    
    return shareText;
  },

  /**
   * Opens WhatsApp with pre-filled text
   */
  openWhatsApp(text: string): void {
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  },

  /**
   * Shares message via WhatsApp
   */
  shareMessage(message: Message): void {
    const shareText = this.generateShareText(message);
    this.openWhatsApp(shareText);
  }
};

/**
 * Date and time formatting utilities
 */
export const DateUtils = {
  /**
   * Formats timestamp to Brazilian time format
   */
  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  /**
   * Formats full date in Brazilian format
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  },

  /**
   * Formats date and time together
   */
  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  }
};

/**
 * String manipulation utilities
 */
export const StringUtils = {
  /**
   * Capitalizes first letter of string
   */
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Truncates text to specified length
   */
  truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  },

  /**
   * Removes extra whitespace and normalizes string
   */
  normalize(str: string): string {
    return str.trim().replace(/\s+/g, ' ');
  },

  /**
   * Checks if string is empty or only whitespace
   */
  isEmpty(str: string): boolean {
    return !str || str.trim().length === 0;
  }
};

/**
 * Array utilities for immutable operations
 */
export const ArrayUtils = {
  /**
   * Adds item to array immutably
   */
  append<T>(array: readonly T[], item: T): T[] {
    return [...array, item];
  },

  /**
   * Removes item at index immutably
   */
  removeAt<T>(array: readonly T[], index: number): T[] {
    return array.filter((_, i) => i !== index);
  },

  /**
   * Updates item at index immutably
   */
  updateAt<T>(array: readonly T[], index: number, item: T): T[] {
    return array.map((current, i) => i === index ? item : current);
  },

  /**
   * Gets last item from array safely
   */
  last<T>(array: readonly T[]): T | undefined {
    return array[array.length - 1];
  }
};

/**
 * Local storage utilities with type safety
 */
export const StorageUtils = {
  /**
   * Safely gets item from localStorage
   */
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to get localStorage item "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Safely sets item in localStorage
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set localStorage item "${key}":`, error);
      return false;
    }
  },

  /**
   * Safely removes item from localStorage
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove localStorage item "${key}":`, error);
      return false;
    }
  }
};