import { useEffect } from 'react';

// 모달 타입 정의
export type ModalType = 'success' | 'error' | 'info' | 'warning';

// Alert 모달 Props
interface AlertModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    type?: ModalType;
    onClose: () => void;
    onConfirm?: () => void;
}

// Validation 모달 Props
interface ValidationModalProps {
    isOpen: boolean;
    errors: string[];
    onClose: () => void;
}

// Confirm 모달 Props
interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

// Alert 모달 컴포넌트
export function AlertModal({
    isOpen,
    title,
    message,
    type = 'success',
    onClose,
    onConfirm
}: AlertModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getIconClass = () => {
        switch (type) {
            case 'success':
                return 'bi bi-check-circle-fill text-success me-2';
            case 'error':
                return 'bi bi-x-circle-fill text-danger me-2';
            case 'info':
                return 'bi bi-info-circle-fill text-primary me-2';
            case 'warning':
                return 'bi bi-exclamation-triangle-fill text-warning me-2';
            default:
                return 'bi bi-info-circle-fill text-primary me-2';
        }
    };

    const getButtonClass = () => {
        switch (type) {
            case 'success':
                return 'btn btn-success';
            case 'error':
                return 'btn btn-danger';
            case 'info':
                return 'btn btn-primary';
            case 'warning':
                return 'btn btn-warning';
            default:
                return 'btn btn-primary';
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: 'block' }}
                tabIndex={-1}
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">
                                <i className={getIconClass()}></i>
                                <span>{title}</span>
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: message }} />
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className={getButtonClass()}
                                onClick={handleConfirm}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

// Validation 모달 컴포넌트
export function ValidationModal({ isOpen, errors, onClose }: ValidationModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: 'block' }}
                tabIndex={-1}
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header bg-warning bg-opacity-10 border-0">
                            <h5 className="modal-title text-warning">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                입력 항목을 확인해주세요
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-flush">
                                {errors.map((error, index) => (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex align-items-start"
                                    >
                                        <span className="badge bg-warning text-dark me-2">
                                            {index + 1}
                                        </span>
                                        <span>{error}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={onClose}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}

// Confirm 모달 컴포넌트
export function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel
}: ConfirmModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{ display: 'block' }}
                tabIndex={-1}
                onClick={onCancel}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title">
                                <i className="bi bi-question-circle-fill text-primary me-2"></i>
                                <span>{title}</span>
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onCancel}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{ __html: message }} />
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCancel}
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}