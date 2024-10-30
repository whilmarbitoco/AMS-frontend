import TeacherWrapper from "../components/TeacherWrapper";
import Table from "../components/Table";

const StudentPage = () => {
  return (
    <TeacherWrapper page="Students">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-md">
          <Table />
        </div>
      </div>
    </TeacherWrapper>
  );
};

export default StudentPage;
