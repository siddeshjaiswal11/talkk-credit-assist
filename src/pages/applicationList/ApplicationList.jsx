import React, { useState } from 'react';
import DataTable from '../../components/ui/table/DataTable.jsx';
import PageHeader from '../../components/ui/pageHeader/PageHeader.jsx';

const ApplicationList = () => {
  const [searchValue, setSearchValue] = useState('');

  const applications = [
    {
      srNo: 1,
      applicationId: 'LOAN40002',
      customerId: 'CUST100477',
      fullName: 'Sneha Nair',
      businessName: 'TechHive Solutions',
      businessType: 'IT / Services',
      loanType: 'Business Loan',
      amountApplied: '₹50,00,000',
      tenure: '7 Years',
      interest: '10.75 %',
      applicationDate: '2024-10-01',
      status: 'Pending',
    },
    {
      srNo: 2,
      applicationId: 'LOAN40003',
      customerId: 'CUST100478',
      fullName: 'Arjun Verma',
      businessName: 'GreenTech Innovations',
      businessType: 'Energy',
      loanType: 'Business Loan',
      amountApplied: '₹75,00,000',
      tenure: '5 Years',
      interest: '9.50 %',
      applicationDate: '2025-03-15',
      status: 'Processed',
    },
    // Add other rows similarly...
  ];

  // Filter applications based on the search value
  const filteredApplications = applications.filter((application) =>
    Object.values(application).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const applicationColumns = [
    {
      field: 'srNo',
      header: 'Sr. No.',
      body: (_rowData, options) => <span>{options.rowIndex + 1}</span>,
    },
    { field: 'applicationId', header: 'Application ID' },
    { field: 'customerId', header: 'Customer ID' },
    { field: 'fullName', header: 'Full Name' },
    { field: 'businessName', header: 'Business Name' },
    { field: 'businessType', header: 'Business Type' },
    { field: 'loanType', header: 'Loan Type' },
    { field: 'amountApplied', header: 'Amount Applied' },
    { field: 'tenure', header: 'Tenure (Years)' },
    { field: 'interest', header: 'Interest (%)' },
    { field: 'applicationDate', header: 'Application Date' },
    {
      field: 'status',
      header: 'Status',
      body: (rowData) => (
        <span style={{ color: rowData.status === 'Pending' ? 'red' : 'green' }}>
          {rowData.status}
        </span>
      ),
    },
    {
      field: 'action',
      header: 'Action',
      body: (rowData) => (
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => console.log(`Navigating to ${rowData.applicationId}`)}
        >
          <span className="smm smm-action text-white bg-[#0D4A84] rounded-full p-2"></span>
        </button>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="All Applications"
        showSearchBar={true}
        onSearchChange={(value) => setSearchValue(value)}
      />
      <DataTable
        tableData={filteredApplications}
        columns={applicationColumns}
        rows={filteredApplications.length}
      />
    </div>
  );
};

export default ApplicationList;
