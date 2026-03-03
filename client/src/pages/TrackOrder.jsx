import React from 'react';

const TrackOrder = () => {
  const steps = [
    { status: 'Ordered', date: '24 Jan', done: true },
    { status: 'Shipped', date: '25 Jan', done: true },
    { status: 'Out for Delivery', date: 'Pending', done: false },
    { status: 'Delivered', date: 'Expected 27 Jan', done: false },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 border-0">
        <h2 className="fw-bold mb-4 text-primary">Track Your Order</h2>
        <p className="text-muted">Order ID: #SHP6829441</p>
        <hr />
        <div className="mt-4">
          {steps.map((step, index) => (
            <div key={index} className="d-flex align-items-start mb-4">
              <div className="me-3">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step.done ? 'bg-success' : 'bg-secondary'}`} style={{width: '30px', height: '30px'}}>
                  <i className={`bi ${step.done ? 'bi-check-lg' : 'bi-clock'} text-white`}></i>
                </div>
                {index !== steps.length - 1 && <div className="ms-3 border-start" style={{height: '40px'}}></div>}
              </div>
              <div>
                <h6 className={`mb-0 fw-bold ${step.done ? 'text-dark' : 'text-muted'}`}>{step.status}</h6>
                <small className="text-muted">{step.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;