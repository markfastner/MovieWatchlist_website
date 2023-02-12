import React from "react";
import { Card } from "react-bootstrap";

function DashboardPage() {
    return (
      <div className="flex justify-start bg-blue-200 min-h-screen">
        <Card className="w-full max-w-sm p-4 bg-blue-100 border-blue-400 shadow sm:p-6 md:p-100">
          <Card.Body>
            <h2 className="text-center mb-4 text-black">Activity status</h2>
          </Card.Body>
        </Card>
      </div>
    );
}

export default DashboardPage;