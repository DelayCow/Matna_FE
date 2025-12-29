
import { useState, useCallback, useRef } from 'react';
import type { ModalType } from '../components/Modal';

interface AlertModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: ModalType;
    onConfirm?: () => void;
}

interface ValidationModalState {
    isOpen: boolean;
    errors: string[];
}

interface ConfirmModalState {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function useModal() {
    const [alertModal, setAlertModal] = useState<AlertModalState>({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onConfirm: undefined
    });

    const [validationModal, setValidationModal] = useState<ValidationModalState>({
        isOpen: false,
        errors: []
    });

    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '확인',
        cancelText: '취소',
        onConfirm: () => {},
        onCancel: () => {}
    });

    // Confirm 모달의 resolve 함수를 저장하기 위한 ref
    const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

    // 모든 모달 닫기
    const closeAllModals = useCallback(() => {
        setAlertModal((prev) => ({ ...prev, isOpen: false }));
        setValidationModal((prev) => ({ ...prev, isOpen: false }));
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        
        // Confirm의 pending promise 처리
        if (confirmResolveRef.current) {
            confirmResolveRef.current(false);
            confirmResolveRef.current = null;
        }

        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
    }, []);

    // Alert 모달 열기
    const showAlert = useCallback(
        (title: string, message: string, type: ModalType = 'success', onConfirm?: () => void) => {
            closeAllModals();
            // 모달이 완전히 닫힌 후 새 모달 열기
            setTimeout(() => {
                setAlertModal({
                    isOpen: true,
                    title,
                    message,
                    type,
                    onConfirm
                });
            }, 100); // 모달 닫히는 애니메이션 시간
        },
        [closeAllModals]
    );

    // Alert 모달 닫기
    const closeAlert = useCallback(() => {
        setAlertModal((prev) => ({ ...prev, isOpen: false }));
    }, []);

    // Validation 모달 열기
    const showValidation = useCallback((errors: string[]) => {
        closeAllModals();
        // 모달이 완전히 닫힌 후 새 모달 열기
        setTimeout(() => {
            setValidationModal({
                isOpen: true,
                errors
            });
        }, 150);
    }, [closeAllModals]);

    // Validation 모달 닫기
    const closeValidation = useCallback(() => {
        setValidationModal((prev) => ({ ...prev, isOpen: false }));
    }, []);

    // Confirm 모달 열기 (Promise 기반)
    const showConfirm = useCallback(
        (
            title: string,
            message: string,
            confirmText?: string,
            cancelText?: string
        ): Promise<boolean> => {
            closeAllModals();
            
            return new Promise((resolve) => {
                // 모달이 완전히 닫힌 후 새 모달 열기
                setTimeout(() => {
                    confirmResolveRef.current = resolve;

                    const handleConfirm = () => {
                        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                        if (confirmResolveRef.current) {
                            confirmResolveRef.current(true);
                            confirmResolveRef.current = null;
                        }
                    };

                    const handleCancel = () => {
                        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                        if (confirmResolveRef.current) {
                            confirmResolveRef.current(false);
                            confirmResolveRef.current = null;
                        }
                    };

                    setConfirmModal({
                        isOpen: true,
                        title,
                        message,
                        confirmText,
                        cancelText,
                        onConfirm: handleConfirm,
                        onCancel: handleCancel
                    });
                }, 150);
            });
        },
        [closeAllModals]
    );

    // Confirm 모달 닫기
    const closeConfirm = useCallback(() => {
        setConfirmModal((prev) => {
            prev.onCancel();
            return prev;
        });
    }, []);

    return {
        // Alert 모달
        alertModal,
        showAlert,
        closeAlert,

        // Validation 모달
        validationModal,
        showValidation,
        closeValidation,

        // Confirm 모달
        confirmModal,
        showConfirm,
        closeConfirm,

        // 모든 모달 닫기
        closeAllModals
    };
}