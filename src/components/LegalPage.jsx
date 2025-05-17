import React from 'react';

const LegalPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg my-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">BESTSELLING AUTHOR OF THE TRIAL AND INDUSTRIAL</h1>
        <h2 className="text-2xl font-semibold text-secondary">INDIA NON JUDICIAL</h2>
        <h3 className="text-xl italic">BOOTED WITH TELEVISION</h3>
      </div>

      <div className="flex justify-between mb-8">
        <div className="badge badge-primary p-4">
          <span className="font-bold">S.No 491257</span>
        </div>
        <div className="badge badge-secondary p-4">
          <span className="font-bold">01-01-2024, Rs: 500.</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card bg-base-200 p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Sold To: Ramakrishna Reddy</h3>
        <div className="space-y-2">
          <p className="font-bold">Workloads Solutions Pvt. Ltd. Pilot No. 4-1-1241/5, Sal Sadan Building, Taj Mahal Hotel Lane, King Koti, District: Hyderabad, Pin:500001, State: Telangana, Wnom: MNC 561027</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">LEGAL AGREEMENT</h2>
        
        <div className="space-y-4">
          <p>This Agreement executed between <span className="font-bold text-accent">Aspire career consultancy</span>, Here in after for brevity's sake referred to as Client, which expression shall, unless exclude by or repugnant to the context, be deemed to mean and include its permitted assigns and successors-in-interest. Our company offers you a Part time/ full time job without registration fee because we know our social duties towards our country.</p>

          <p>We provide you a fruitful work in which you will be given 6 calendar days of time to fill total number of 700 forms completely.</p>

          <p>Out of 700 forms, even if you make a mistake in 70 forms, then there is no problem, you have to work with 90 percent accuracy but it is to be cleared that you have to fill total number of 700 forms completely. To fill every single form, the company gives you 25 indian rupees, so according to this, the company had bought you 17,500 rupees for filling 700forms.</p>

          <p>You have to fill this 700 forms within 6 days because after that the ID will be deactivated through software analog system automatically.</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">While working, you have to take care of some things:-</h3>
        <ol className="list-decimal pl-6 space-y-3">
          <li className="p-2 bg-base-200 rounded">Do please fill the total number of 700 forms within 6 calendar days from your 'Agreement signing date/day).</li>
          <li className="p-2 bg-base-200 rounded">Do please complete the entire work in a single computer or laptop. Swapping(Changing) of computer or laptop is highly prohibited due to security purposes.</li>
          <li className="p-2 bg-base-200 rounded">Never ever submit completely blank forms. Submission of blank forms may be corrupt your package.</li>
          <li className="p-2 bg-base-200 rounded">You can login as many times as you can but you have to logout every time during breaks.</li>
          <li className="p-2 bg-base-200 rounded">If the work is not completed within 6 days or there is problem on your behalf in the login logout or you can not do all the things written above in guidance of company's legal advisors than as you know , no registration fee is taken, so you may have to deposit a refundable security amount of 4,000 rupees(four thousands) for the loss of company's package and manpower.</li>
          <li className="p-2 bg-base-200 rounded">If the work is not completed within 6 days by you than in between 6 days you can opt for NOC or extra 3 days extention to complete the work . For this you have to pay refundable security amount of 4,000 rupees. So keep in mind and complete the work within given 6 days. The package given to you costs 25,000 (Twenty-five thousands) for work, so donot destroy it , do please complete it. </li>
          <li className="p-2 bg-base-200 rounded"> So you are requested to complete the work on time and keep in mind all above points. </li>
        </ol>
      </div>

      {/* <div className="flex justify-center mt-10">
        <button className="btn btn-primary">Accept Agreement</button>
      </div> */}
    </div>
  );
};

export default LegalPage;