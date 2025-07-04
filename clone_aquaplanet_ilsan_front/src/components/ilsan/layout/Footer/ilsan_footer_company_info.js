import React from 'react';

const CompanyInfo = ({ policies, info, addresses }) => {
  return (
    <>
      <div className="policies">
        {policies.map((policy, index) => (
          <a key={index} href={policy.link || "#"}>
            <span>{policy.text}</span>
          </a>
        ))}
      </div>

      <dl className="company-info">
        <dt>대표이사</dt>
        <dd>{info.ceo}</dd>
        <dt>대표전화</dt>
        <dd>{info.tel}</dd>
        <dt>사업자등록번호</dt>
        <dd>{info.businessNumber}</dd>
        <dt>통신판매번호</dt>
        <dd>{info.eCommerceRegNo}</dd>
        <dt>
          <a href={info.customerVoiceLink}> 고객소리함 </a>
        </dt>
      </dl>

      <div className="company-address">
        {addresses.map((address, index) => (
          <span key={index}>{address}</span>
        ))}
      </div> 
    </>

  );
};

export default CompanyInfo;