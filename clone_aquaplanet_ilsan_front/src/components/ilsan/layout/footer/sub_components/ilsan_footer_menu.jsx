import React from 'react';

const FooterMenuSection = ({ title, items }) => {
  return (
    <dl className="footer-menu-item">
      <dt>{title}</dt>
      {items.map((item, index) => (
        <dd key={index}> 
          <a href={item.link || "#"}>
            <span>{item.text}</span>
          </a>
        </dd>
      ))}
    </dl>
  );
};

export default FooterMenuSection;