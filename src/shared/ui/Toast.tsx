'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toast as ToastType } from '../types/toast';
import { useToastStore } from '../store/useToastStore';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes
} from 'react-icons/fa';

interface ToastItemProps {
    toast: ToastType;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
    const { removeToast } = useToastStore();

    const getToastStyles = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <FaCheckCircle className="w-5 h-5" />;
            case 'error':
                return <FaExclamationCircle className="w-5 h-5" />;
            case 'warning':
                return <FaExclamationTriangle className="w-5 h-5" />;
            case 'info':
                return <FaInfoCircle className="w-5 h-5" />;
            default:
                return <FaInfoCircle className="w-5 h-5" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg min-w-80 max-w-md ${getToastStyles()}`}
        >
            <div className="flex items-center space-x-3">
                {getIcon()}
                <div>
                    <p className="font-semibold text-sm">{toast.title}</p>
                    {toast.message && (
                        <p className="text-xs opacity-90 mt-1">{toast.message}</p>
                    )}
                </div>
            </div>

            <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white hover:opacity-75 transition-opacity"
            >
                <FaTimes className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const ToastContainer: React.FC = () => {
    const { toasts } = useToastStore();

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// 편의 함수들
export const useToast = () => {
    const { addToast } = useToastStore();

    return {
        showSuccess: (title: string, message?: string) =>
            addToast({ type: 'success', title, message }),

        showError: (title: string, message?: string) =>
            addToast({ type: 'error', title, message }),

        showWarning: (title: string, message?: string) =>
            addToast({ type: 'warning', title, message }),

        showInfo: (title: string, message?: string) =>
            addToast({ type: 'info', title, message }),
    };
}; 