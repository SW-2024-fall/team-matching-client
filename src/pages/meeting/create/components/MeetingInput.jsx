import { TextInput } from 'react-native';

export default function MeetingNameInput({ meetingName, setMeetingName }) {
    return (
        <TextInput
            placeholder="모임 이름"
            value={meetingName}
            onChangeText={(text) => {
              setMeetingName(text);
            }}
        />
    );
}