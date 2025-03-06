import Title from "../../ui/Title";
import { users } from "../../constants";
import Member from "./Member";


const Team = () => {
    return(
        <div className="bg-white p-3 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-4">
            <Title>Team</Title>
            {users.map((user, index) => (
                <Member key={index} user={user} />
            ))}
        </div>
    );
};

export default Team;