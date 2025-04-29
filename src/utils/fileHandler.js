// src/utils/fileHandler.js

import { toast } from "react-hot-toast";

/**
 * Handles file selection and prevents duplicate file uploads.
 * 
 * @param {File} newFile - The new file selected by the user.
 * @param {File|null} currentFile - The currently selected file (could be null if no file is selected).
 * @param {Function} setter - The setter function to update the state with the new file.
 * @param {string} label - A label to identify the file (e.g., 'Aadhaar', 'Signature').
 */
export const handleUniqueFileSelection = (newFile, currentFile, setter, label) => {
  if (!newFile) return; // If no file is selected, exit early.

  // Check if the new file is the same as the current file based on name, size, and type.
  const isSameFile =
    currentFile &&
    newFile.name === currentFile.name &&
    newFile.size === currentFile.size &&
    newFile.type === currentFile.type;

  // If it's the same file, show an error message and don't update the state.
  if (isSameFile) {
    toast.error(`${label} file is already selected.`);
    return;
  }

  // If it's a new file, update the state with the selected file.
  setter(newFile);
};
