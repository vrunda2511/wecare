import React from 'react';
import './faq.styles.css'

import { Collapse } from 'antd';


const { Panel } = Collapse;

function Faq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Frequently Asked Questions</h2>
          {/* <p>Quidem reiciendis iure, aperiam blanditiis. Alias esse, nam, ea quam</p> */}
        </div>
        <Collapse defaultActiveKey={['1']}>
          <Panel className="panel" header="Is the service safe and hygienic?" key="1">
            <p>Yes, our professionals display their Aarogya Setu status at the start of the service, maintain social distancing &amp; sanitise all high touch points after the service. Additionally, all professionals carry PPE kits and have undergone training in WHO hygiene guidelines.</p>
          </Panel>
          <Panel className="panel" header="Will the professional arrange items after service?" key="2">
            <p>As per regulations, we recommend you to place the items back where they were. Professionals can help if needed, after your permission.</p>
          </Panel>
          <Panel className="panel" header="Will I have to provide any chemicals/soap?" key="3">
            <p>No,we carry all chemicals.</p>
          </Panel>
          <Panel className="panel" header="My sofa covers aren’t removable. Can you clean it?" key="4">
            <p>Yes! There are several methods that can be used if your fabric sofa does not have removable covers. Rest assured, the sofa cleaning professionals hold expertise in the same.</p>
          </Panel>
          <Panel className="panel" header="What quality of material and equipment do you use?" key="5">
            <p>Our company use industrial grade products for cleaning and disinfectants which are odorless and leave no chemical waste behind.</p>
          </Panel>
          
        </Collapse>
        
      </div>
    </div>  
  );
}

export default Faq;