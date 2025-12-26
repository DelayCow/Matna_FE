import { useEffect, useState, useRef } from "react";

interface DueDateCountDownProps{
    dueDate: string;
    className?: string;
    layout?: 'inline' | 'detail';
}

export default function DueDateCountDown({ dueDate, className='', layout='inline' }: DueDateCountDownProps){
    const [countdown, setCountdown] = useState('계산 중...');
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const targetDate = new Date(dueDate.replace(' ', 'T'));

        const updateCountdown = () =>{
            const now: number = new Date().getTime();
            const distance: number = targetDate.getTime() - now;

            if(distance <= 0){
                setCountdown('모집마갑');
                if(intervalRef.current){
                    clearInterval(intervalRef.current);
                }
                return;
            }
            
            const D_IN_MS = 1000 * 60 * 60 * 24;
            const H_IN_MS = 1000 * 60 * 60;
            const M_IN_MS = 1000 * 60;

            const days = Math.floor(distance / D_IN_MS);
            const hours = Math.floor((distance % D_IN_MS) / H_IN_MS);
            const minutes = Math.floor((distance % H_IN_MS) / M_IN_MS);
            const seconds = Math.floor((distance % M_IN_MS) / 1000);

            if (layout === 'inline') {
                setCountdown(
                    `남은 기간 : ${days}일 ${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`
                );
            } else {
                setCountdown(
                    `${days}일 ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
                );
            }
        };

        updateCountdown();
        intervalRef.current = setInterval(updateCountdown, 1000);
        
        return () => {
            if (intervalRef.current){
                clearInterval(intervalRef.current);
            }
        };
    }, [dueDate]);

    return(
        <>
        {layout === 'inline'? (
            <small className={`text-danger d-block mb-1 ${className}`}>
                {countdown}
            </small>
        ) : (
            <div className="text-start mb-2">
                <span className="text-dark me-2 fw-bold">남은 시간</span>
                <span id="data-remaining-time" className={`fw-bold text-danger ${className}`}>
                    {countdown}
                </span>
            </div>
        )}
        </>
    );
}