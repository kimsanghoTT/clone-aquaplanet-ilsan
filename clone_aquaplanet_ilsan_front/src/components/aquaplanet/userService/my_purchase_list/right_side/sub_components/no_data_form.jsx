import React from 'react';

const NoData = () => {
    return (
        <div className="ticket-detail-list no-data">
            <div className="ticket-shape no-data">
                <span>아직 구매한 상품이 없습니다.</span>
                <span>티켓을 구매하면 상세 내역을 확인할 수 있습니다.</span>
                <a href="/aquaplanet/mall">티켓 구매하기</a>
            </div>
        </div>
    );
};

export default NoData;