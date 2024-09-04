import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FindUserId from "../components/Feature/FindUserId";

describe("FindUserId Component", () => {
  // 올바르게 렌더링되는지 확인
  test("render correctly", async () => {
    renderFindUserId();

    const findUserElements = screen.getAllByText("아이디 찾기");
    expect(findUserElements).toHaveLength(2);
  });

  // 휴대폰번호 미입력 시 에러 메세지 출력
  test("shows error msg if phoneNum is not provided", async () => {
    renderFindUserId();

    const findUserButton = screen.getAllByText("아이디 찾기")[1];
    fireEvent.click(findUserButton);
    expect(
      await screen.findByText("휴대폰 번호를 입력하세요.")
    ).toBeInTheDocument();
  });

  // 사용자를 찾을 수 없을 때 에러 메세지 출력
  test("shows error msg if user is not found", async () => {
    renderFindUserId();

    fireEvent.change(screen.getByLabelText("휴대폰 번호"), {
      target: { value: "000-0000-0000" },
    });
    const findUserButton = screen.getAllByText("아이디 찾기")[1];
    fireEvent.click(findUserButton);

    expect(
      await screen.findByText("사용자를 찾을 수 없습니다.")
    ).toBeInTheDocument();
  });

  // 사용자 이메일 출력
  test("shows user email if user is found", async () => {
    renderFindUserId();

    fireEvent.change(screen.getByLabelText("휴대폰 번호"), {
      target: { value: "010-1234-5678" },
    });
    const findUserButton = screen.getAllByText("아이디 찾기")[1];
    fireEvent.click(findUserButton);

    expect(await screen.findByText("이메일")).toBeInTheDocument();
  });
});

function renderFindUserId() {
  return render(<FindUserId />);
}
