import ClassReviewList from "./ClassReviewList";
import ClassReviewWrite from "./ClassReviewWrite";

const ClassReviewModule = ({
    study_pay_yn = 'N'
}) => {
    return (
        <div>
            {study_pay_yn == 'Y' && (
                <ClassReviewWrite />
            )}
            <ClassReviewList />
        </div>
    );
}

export default ClassReviewModule;