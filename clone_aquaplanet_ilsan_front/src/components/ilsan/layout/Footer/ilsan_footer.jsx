import React from "react";
import { 
  footerMenus, 
  companyPolicies, 
  companyInfo, 
  companyAddresses, 
  familySiteLinks 
} from './data/ilsan_footer_data';
import "../../../../css/ilsan/ilsan_footer.css";
import FooterMenuSection from "./sub_components/ilsan_footer_menu.jsx";
import CompanyInfo from "./sub_components/ilsan_footer_company_info.jsx";
import FamilySite from "./sub_components/ilsan_footer_family_site.jsx";


const Footer = () => {
  return (
    <footer className="ilsan-footer">
      <div className="footer-inner">
        <div className="footer-menu-list">
          {footerMenus.map((menu, index) => (
            <FooterMenuSection key={index} title={menu.title} items={menu.items} />
          ))}
        </div>
        <div className="address-info">
            <CompanyInfo policies={companyPolicies} info={companyInfo} addresses={companyAddresses} />
          <div className="copyright">
            <span>Copyright ⓒ Aquaplanet Co.,Ltd. All Rights Reserved.</span>
          </div>
        </div>
        <FamilySite familyLinks={familySiteLinks} />
      </div>
    </footer>
  );
};

export default Footer;