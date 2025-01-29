import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Ensure this is the correct import path

interface Submission {
  _id: string;
  influencerName: string;
  campaignName: string;
  fileUrl: string;
  status: string;
}

const ApprovalPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Submission[]>('http://localhost:3000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        setError('Error fetching submissions');
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleApproval = async (submissionId: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(`http://localhost:3000/api/submissions/${submissionId}`, { status });
      setSubmissions((prev) => prev.filter((submission) => submission._id !== submissionId));
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };

  return (
    <div>
      <Navbar /> 
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Approve Submissions</h1>

        {loading && <p>Loading submissions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && submissions.length === 0 && <p>No pending submissions.</p>}

        {!loading && !error && submissions.length > 0 && (
          <ul className="space-y-4 mt-6">
            {submissions.map((submission) => (
              <li key={submission._id} className="border p-4 rounded-lg">
                <h2 className="text-xl font-semibold">{submission.campaignName}</h2>
                <p className="text-gray-600">Influencer: {submission.influencerName}</p>
                <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Submission
                </a>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleApproval(submission._id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleApproval(submission._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApprovalPage;
