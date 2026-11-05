let toastHandler = null;

export const authToast = (handler) => {
    toastHandler = handler;
};

export const toast = {
    success: (message) => toastHandler?.(message, "success"),

    error: (message) => toastHandler?.(message, "error"),

    warning: (message) => toastHandler?.(message, "warning"),

    info: (message) => toastHandler?.(message, "info"),
};