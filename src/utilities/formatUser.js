export const getFormattedUsername = (emailString) => {
    if (!emailString) return '';

    const prefix = emailString.split('@')[0]; 

    const words = prefix.replace(/[._-]/g, ' ').split(' ');

    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };