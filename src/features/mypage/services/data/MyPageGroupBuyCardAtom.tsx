
export const getStatusStep = (status: string): number => {
  switch (status) {
    case 'open':  return 1;
            case 'closed': return 2;
            case 'paid': return 3;
            case 'delivered': return 4;
            case 'shared': return 5;
            case 'canceled': return 0;
            default: return 1;
  }
};

export const getButtonConfig = (status: string, isHost: boolean) => {
  
  if (status === 'OPEN') {
    return isHost ? null : { text: "참여 취소", cls: "btn-outline-danger", action: "CANCEL" };
  }
  if (status === 'CLOSED') {
    return isHost ? { text: "결제정보 등록", cls: "btn-danger", action: "REG_PAYMENT" } : null;
  }
  if (status === 'PAID') {
    return { text: "결제정보 확인", cls: "btn-outline-primary", action: "VIEW_PAYMENT" };
  }
  if (status === 'DELIVERED') {
    return { text: "도착정보 확인", cls: "btn-success", action: "VIEW_ARRIVAL" };
  }
  if (status === 'SHARED') {
    return { text: "나눔 받았어요!", cls: "btn-success", action: "CONFIRM_SHARE" };
  }
  return null;
};