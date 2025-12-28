interface PeriodPriceTableProps {
    maxParticipants: number;
    price: number;
    feeRate: number;
    quantity: number;
    unit: string;
}

export default function PeriodPriceTable({maxParticipants, price, feeRate, quantity, unit}: PeriodPriceTableProps){

    const totalWithFee = price * (1 + feeRate / 100);
    
    if (price === 0 || maxParticipants <= 1){
        return(
            <p className="text-muted small">
                예상 금액 테이블을 표시할 수 없습니다.
            </p>
        );
    }

    const priceData = [];
    for (let count = 2; count <= maxParticipants; count++){
        const pricePerPerson = Math.round(totalWithFee / count);
        const amountPerPerson = (quantity / count).toFixed(1);

        priceData.push({
            count,
            pricePerPerson,
            amountPerPerson
        });
    }

    return(
        <table className="table table-bordered text-center group-buy-table mb-0">
            <thead>
                <tr>
                    {priceData.map(item => (
                        <th key={item.count} scope="col">
                            {item.count}명
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {priceData.map(item => (
                        <td key={item.count}>
                            {item.pricePerPerson.toLocaleString()}원
                            <br />
                            {item.amountPerPerson}{unit}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}