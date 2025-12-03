const STORAGE_KEYS = {
  NOTES: 'gulf_portfolio_notes',
  PROMPTS: 'gulf_portfolio_prompts',
  MILESTONES: 'gulf_portfolio_milestones'
};

export const Storage = {
  // ===== Notes =====
  saveNote: (note) => {
    const notes = Storage.getNotes();
    const newNote = { ...note, id: Date.now() };
    notes.push(newNote);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return newNote;
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

  // ===== Prompts =====
  savePrompt: (prompt) => {
    const prompts = Storage.getPrompts();
    const newPrompt = { ...prompt, id: Date.now() };
    prompts.push(newPrompt);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
    return newPrompt;
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
  },

  // ===== Milestones =====
  saveMilestone: (milestone) => {
    const milestones = Storage.getMilestones();
    const newMilestone = { ...milestone, id: Date.now() };
    milestones.push(newMilestone);
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
    return newMilestone;
  },

  getMilestones: () => {
    const milestones = localStorage.getItem(STORAGE_KEYS.MILESTONES);
    return milestones ? JSON.parse(milestones) : [];
  },

  deleteMilestone: (milestoneId) => {
    const milestones = Storage.getMilestones().filter(m => m.id !== milestoneId);
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
  },

  getMilestonesByProject: (project) => {
    return Storage.getMilestones().filter(m => m.project === project);
  }
};
