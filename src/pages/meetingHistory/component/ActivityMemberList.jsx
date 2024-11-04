import { View, Text, Pressable } from "react-native"
import ActivityMemberComponent from "./ActivityMemberComponent";
import styled from "styled-components";

class Member {
    constructor(name, studentId, phoneNumber, attendanceScore, department, tags = []) {
      this.name = name;
      this.studentId = studentId;
      this.phoneNumber = phoneNumber;
      this.attendanceScore = attendanceScore;
      this.department = department; // 학과
      this.tags = tags; // 태그 배열
    }
  
    // 출석 점수 업데이트 메서드
    updateAttendance(newScore) {
      this.attendanceScore = newScore;
    }
  
    // 태그 추가 메서드
    addTag(tag) {
      this.tags.push(tag);
    }
  
    // 태그 삭제 메서드
    removeTag(tag) {
      this.tags = this.tags.filter(existingTag => existingTag !== tag);
    }
  
    // 멤버 정보 출력 메서드
    getInfo() {
      return `이름: ${this.name}, 학번: ${this.studentId}, 전화번호: ${this.phoneNumber}, 출석점수: ${this.attendanceScore}, 학과: ${this.department}, 태그: ${this.tags.join(', ')}`;
    }
  }

// 멤버 리스트 관리 클래스
class MemberList {
    constructor() {
        this.members = []; // 멤버 리스트 배열
    }

    // 멤버 추가 메서드
    addMember(member) {
        this.members.push(member);
    }

    // 멤버 삭제 메서드 (학번 기준)
    removeMember(studentId) {
        this.members = this.members.filter(member => member.studentId !== studentId);
    }

    // 멤버 검색 메서드 (학번 기준)
    findMember(studentId) {
        return this.members.find(member => member.studentId === studentId);
    }

    // 모든 멤버 출력 메서드
    listAllMembers() {
        return this.members.map(member => member.getInfo()).join('\n');
    }
    getAllMembers() {
        return this.members;
      }
}

export default function ActivityMemberList() {
    const memberList = new MemberList();

    // 멤버 추가
    memberList.addMember(new Member("홍길동", "20", "010-1234-5678", 95, "컴퓨터과학부", ["활발", "승부욕"]));
    memberList.addMember(new Member("김철수", "19", "010-2345-6789", 88, "철학과", ["활발", "승부욕"]));
    memberList.addMember(new Member("이영희", "21", "010-3456-7890", 90, "경제학과", ["활발", "승부욕"]));
    return (
        <Container>
            
            {memberList.getAllMembers().map((member, index) => (
                <ActivityMemberComponent key={index} name={member.name} studentId={member.studentId} phoneNo={member.phoneNumber} attendanceScore={member.attendanceScore} department={member.department} tags={member.tags}></ActivityMemberComponent>
            ))}
        </Container>
    )
}
const Container = styled.View`
  marginTop:20px;
`;
