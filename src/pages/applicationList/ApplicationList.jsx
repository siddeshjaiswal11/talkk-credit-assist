import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/ui/table/DataTable.jsx';
import PageHeader from '../../components/ui/pageHeader/PageHeader.jsx';
import { getLoanApplications } from '../../API/application/applicationAPI.js';

const ApplicationList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getLoanApplications();
        if (response?.items) {
          const formattedApplications = response.items.map((item, index) => ({
            srNo: index + 1,
            applicationId: item._id,
            fullName: item.applicant_name,
            businessName: item.business_name,
            businessType: item.business_type,
            loanType: item.loan_type,
            amountApplied: `₹${Number(item.loan_amount_applied).toLocaleString()}`,
            tenure: `${item.loan_tenure} Years`,
            interest: `${item.interest_rate} %`,
            applicationDate: new Date(item.application_date).toLocaleDateString(),
            status: 'Pending', // Default status
          }));
          setApplications(formattedApplications);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

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
        onClick={() => navigate(`/application-review?applicationId=${rowData.applicationId}`)}
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
