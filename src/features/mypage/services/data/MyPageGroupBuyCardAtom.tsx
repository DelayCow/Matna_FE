
export const getStatusStep = (status: string): number => {
  const s = status.toUpperCase();
  switch (s) {
    case 'OPEN': case 'RECRUITING': return 1;
    case 'CLOSED': case 'PAYMENT_WAIT': return 2;
    case 'PAID': case 'DELIVERED': return 3;
    case 'SHARED': case 'COMPLETED': return 4;
    default: return 1;
  }
};

export const getButtonConfig = (status: string, isHost: boolean) => {
  const s = status.toUpperCase();
  if (s === 'OPEN' || s === 'RECRUITING') {
    return isHost ? null : { text: "참여 취소", cls: "btn-outline-danger", action: "CANCEL" };
  }
  if (s === 'CLOSED') {
    return isHost ? { text: "결제정보 등록", cls: "btn-danger", action: "REG_PAYMENT" } : null;
  }
  if (s === 'PAID') {
    return { text: "결제정보 확인", cls: "btn-outline-primary", action: "VIEW_PAYMENT" };
  }
  if (s === 'DELIVERED') {
    return { text: "도착정보 확인", cls: "btn-success", action: "VIEW_ARRIVAL" };
  }
  if (s === 'SHARED' || s === 'COMPLETED') {
    return { text: "나눔 받았어요!", cls: "btn-success", action: "CONFIRM_SHARE" };
  }
  return null;
};