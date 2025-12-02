// Simple localStorage utility for saving notes and prompts

const STORAGE_KEYS = {
  NOTES: 'gulf_portfolio_notes',
  PROMPTS: 'gulf_portfolio_prompts',
  MILESTONES: 'gulf_portfolio_milestones'
};

export const Storage = {
  // Notes
  saveNote: (note) => {
    const notes = Storage.getNotes();
    notes.push(note);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return note;
  },

  getNotes: () => {
    const notes = localStorage.getItem(STORAGE_KEYS.NOTES);
    return notes ? JSON.parse(notes) : [];
  },

  deleteNote: (noteId) => {
    const notes = Storage.getNotes().filter(note => note.id !== noteId);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },

  getNotesByProject: (project) => {
    return Storage.getNotes().filter(note => note.project === project);
  },

  // Prompts
  savePrompt: (prompt) => {
    const prompts = Storage.getPrompts();
    prompts.push(prompt);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
    return prompt;
  },

  getPrompts: () => {
    const prompts = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return prompts ? JSON.parse(prompts) : [];
  },

  deletePrompt: (promptId) => {
    const prompts = Storage.getPrompts().filter(prompt => prompt.id !== promptId);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
  },

  getPromptsByProject: (project) => {
    return Storage.getPrompts().filter(prompt => prompt.project === project);
  }
};
