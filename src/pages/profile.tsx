import { NextPage } from "next";
import useSWR from "swr";
import { User } from "@/models/user/User";
import React, { useEffect, useRef, useState } from "react";
import { ResponseBody } from "@/models/common/ResponseBody";
import { UserProfileImage } from "@/components/UserProfileImage";
import { NOT_FOUND_USER_MESSAGE } from "@/constants/message";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";
import { SideMenuBar } from "@/components/SideMenuBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/service/firebase";
import profileStyles from "@/styles/profile.module.scss";
import Image from "next/image";
import { useStores } from "@/stores/context";
import { observer } from "mobx-react";
import { Layout } from "@/components/Layout";
import { BelongOrganization } from "@/models/organization/BelongOrganization";
<<<<<<< HEAD
import { useDebounce } from "@/components/UseDebounce";
import { Organization } from "@/models/organization/Organization";

const BelongOrganizationsName: NextPage<{ item: BelongOrganization }> =
  observer(({ item }) => {
    const { organizationStore } = useStores();
    const { organizationName } = item;
    return (
      <>
        <div
          className={`${profileStyles["belong__item"]} typography__text--small`}
        >
          <button
            onClick={() => {
              if (
                confirm(
                  `"${organizationName}"을 소속에서 삭제하시겠습니까?`
                ) === true
              ) {
                organizationStore.deleteBelongOrganization(item);
                console.log(
                  `${organizationName}가(이) 소속에서 삭제되었습니다`
                );
              }
            }}
          >
            <span className="material-symbols-sharp">close</span>
          </button>
          <div>
            <label>{organizationName}</label>
          </div>
        </div>
        <br />
      </>
    );
  });

const BelongOrganizationsNameGroup: NextPage<{ items: BelongOrganization[] }> =
  observer(({ items }) => {
    return (
      <div className={`${profileStyles["belong"]}`}>
        {items.map((item, key) => (
          <BelongOrganizationsName item={item} key={key} />
        ))}
      </div>
    );
  });

const RecommendedOrganizationsNameGroup: NextPage<{ items: Organization[] }> =
  observer(({ items }) => {
    const slicedItems = items.slice(0, 5);
    return (
      <div className={`${profileStyles["organization__content"]}`}>
        {slicedItems.map((item, key) => (
          <RecommendedOrganizationsName item={item} key={key} />
        ))}
      </div>
    );
  });

const RecommendedOrganizationsName: NextPage<{ item: Organization }> = observer(
  ({ item }) => {
    const { organizationStore } = useStores();
    return (
      <>
        <div
          id={"organizations__item"}
          className={`${profileStyles["organization__item"]} typography__text--small`}
          onClick={(e) => {
            const text = e.target as HTMLElement;
            const input = document.getElementById(
              "organization__input"
            ) as HTMLInputElement;
            organizationStore.onChangeNameInput(text.innerHTML);
            input!.value = organizationStore.typedName;
            organizationStore.setDropDownHidden(true);
          }}
        >
          <label>{item.name}</label>
        </div>
      </>
    );
  }
);
=======
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79

const NicknameForm: NextPage = observer(() => {
  return (
    <div
      className={`${profileStyles["nickname-form"]} elevation__card__search-bar__contained-button--waiting__etc`}
    >
      <div className={`${profileStyles["title"]}`}>
        <span className="material-symbols-sharp">text_snippet</span>
        <label className={"typography__text--big"}>닉네임 및 자기소개</label>
      </div>
      <div className={`${profileStyles["nickname"]} `}>
        <label className={"typography__caption"}>닉네임</label>
        <input type={"text"} className={"typography__text--small"} />
        <label className={"typography__caption"}>
          다른 농부들에게 표시되는 닉네임입니다
        </label>
      </div>
      <div className={`${profileStyles["introduce"]}`}>
        <label className={"typography__caption"}>자기소개</label>
        <input type={"text"} className={"typography__text--small"} />
        <label className={"typography__caption"}>
          나를 나타낼 수 있는 소개 내용을 입력해주세요
        </label>
      </div>
    </div>
  );
});

const OrganizationForm: NextPage = observer(() => {
  const { organizationStore } = useStores();
<<<<<<< HEAD
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    organizationStore.onChangeNameInput(debounceSearch);
  }, [debounceSearch]);

  useEffect(() => {
    organizationStore.fetchBelongOrganizations();
    if (inputRef.current) {
      inputRef.current.addEventListener("focus", () => {
        organizationStore.setDropDownHidden(false);
      });
      inputRef.current.addEventListener("blur", () => {
        setTimeout(() => organizationStore.setDropDownHidden(true), 100);
=======
  const [dropDownHidden, setDropDownHidden] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focus", () => {
        setDropDownHidden(false);
      });
      inputRef.current.addEventListener("blur", () => {
        setTimeout(() => setDropDownHidden(true), 100);
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79
      });
    }
  }, []);

  useEffect(() => {
    const content = document.querySelector<HTMLDivElement>(
      `.${profileStyles["organization__content"]}`
    );

    if (!content) return;

<<<<<<< HEAD
    if (organizationStore.dropDownHidden) {
=======
    if (dropDownHidden) {
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
<<<<<<< HEAD
  }, [organizationStore.dropDownHidden]);
=======
  }, [dropDownHidden]);
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79

  return (
    <div
      className={`${profileStyles["organization-form"]} elevation__card__search-bar__contained-button--waiting__etc`}
    >
      <div className={`${profileStyles["title"]}`}>
        <span className="material-symbols-sharp">business_center</span>
        <label className={"typography__text--big"}>소속</label>
      </div>
      <div
        className={`${profileStyles["belong__title"]} typography__text--small`}
      >
        <label>현재 설정된 조직</label>
      </div>
<<<<<<< HEAD
      <BelongOrganizationsNameGroup
        items={
          organizationStore.belongOrganizations
            ? organizationStore.belongOrganizations
            : []
        }
      />
=======
      <div className={`${profileStyles["belong"]}`}>
        <div
          className={`${profileStyles["belong__item"]} typography__text--small`}
        >
          <button>
            <span className="material-symbols-sharp">close</span>
          </button>
          <div>
            <label>한성대학교</label>
          </div>
        </div>

        <div
          className={`${profileStyles["belong__item"]} typography__text--small`}
        >
          <button>
            <span className="material-symbols-sharp">close</span>
          </button>
          <div>
            <label>서울골프대학교</label>
          </div>
        </div>
      </div>
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79
      <div className={`${profileStyles["organization__name"]} `}>
        <label
          className={`${profileStyles["organization__subtitle"]} typography__caption`}
        >
          소속명
        </label>
        <input
          type={"text"}
<<<<<<< HEAD
          id={"organization__input"}
          className={"typography__text--small"}
          ref={inputRef}
          onChange={async (e) => {
            setSearchInput(e.target.value);
          }}
        />
        {organizationStore.recommendOrganizations.length !== 0 && (
          <RecommendedOrganizationsNameGroup
            items={organizationStore.recommendOrganizations}
          />
        )}

=======
          className={"typography__text--small"}
          ref={inputRef}
          value={organizationStore.typedName}
          onChange={(e) => {
            organizationStore.onChangeNameInput(e.target.value);
          }}
        />
        <div className={`${profileStyles["organization__content"]}`}>
          <div
            id={"organizations__item"}
            className={`${profileStyles["organization__item"]} typography__text--small`}
            onClick={async (e) => {
              const target = e.target as HTMLLabelElement;
              await organizationStore.onChangeNameInput(
                target.textContent || ""
              );
              setDropDownHidden(true);
            }}
          >
            <label>한성대학교</label>
          </div>
        </div>
>>>>>>> ad0493a73893220a958e7b2783506573d0b9cb79
        <label
          className={`${profileStyles["organization__subtitle"]} typography__caption`}
        >
          소속된 학교/회사 등을 검색해주세요
        </label>
      </div>
      <div className={`${profileStyles["email"]}`}>
        <label className={"typography__caption"}>이메일</label>
        <input
          type={"text"}
          className={"typography__text--small"}
          onChange={(e) => {
            organizationStore.onChangeEmailInput(e.target.value);
          }}
        />
        <label className={"typography__caption"}>
          소속된 학교/회사의 이메일 주소를 입력해주세요
        </label>
      </div>
      <button
        className={`${profileStyles["image-upload-button"]}`}
        onClick={() => {
          organizationStore.sendOrganizationVerifyEmail();
        }}
        disabled={organizationStore.checkIfNameIncluded() ? false : true}
      >
        <span className="material-symbols-sharp">add</span>
        <label className={"typography__text"}>소속 등록하기</label>
      </button>
    </div>
  );
});

const UserProfile: NextPage = observer(() => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const { roomListStore, organizationStore } = useStores();
  const fetcher = (args: string) => fetch(args).then((res) => res.json());
  const { data, isLoading } = useSWR<ResponseBody<User>>(
    `/api/users/${user?.uid}`,
    fetcher
  );
  const profile = data?.data;

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    router.replace("/login");
    return <div>Please sign in to continue</div>;
  }

  if (data?.message === NOT_FOUND_USER_MESSAGE || profile === undefined)
    return (
      <>
        <h3>{NOT_FOUND_USER_MESSAGE}</h3>
      </>
    );
  if (isLoading)
    return (
      <>
        <h3>loading</h3>
      </>
    );
  return (
    <>
      <Layout>
        <div>
          <div className={`${profileStyles["page-title"]}`}>
            <label
              className={`${profileStyles["title"]} typography__sub-headline`}
            >
              내 프로필
            </label>
            <div className={`${profileStyles["save-button"]} typography__text`}>
              <label>프로필 변경사항 저장하기</label>
            </div>
            <div className={`${profileStyles["undo-button"]} typography__text`}>
              <label>되돌리기</label>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={`${profileStyles["profile-image-form"]} elevation__card__search-bar__contained-button--waiting__etc`}
              >
                <div className={`${profileStyles["title"]}`}>
                  <span className="material-symbols-sharp">image</span>
                  <label className={"typography__text--big"}>프로필 사진</label>
                </div>
                <div className={`${profileStyles["image-upload"]}`}>
                  {roomListStore.imageUrl === "" ? (
                    <div className={`${profileStyles["image"]}`}></div>
                  ) : (
                    <Image
                      className={`${profileStyles["image"]}`}
                      alt={"selected-img"}
                      src={roomListStore.imageUrl}
                      width={152}
                      height={152}
                    />
                  )}
                  <div className={`${profileStyles["precautions"]}`}>
                    <label className={"typography__text--small"}>
                      이런 프로필 사진은 안돼요
                    </label>
                    <ul className={"typography__caption"}>
                      <li>&nbsp;· &nbsp; 타인에게 불쾌감을 줄 수 있는 사진</li>
                      <li>&nbsp;· &nbsp; 5mb을 초과하는 용량의 이미지</li>
                      <li>&nbsp;· &nbsp; 자기 자신이 아닌 타인의 사진 도용</li>
                      <li>&nbsp;· &nbsp; 그 외 부적절하다고 판단되는 사진</li>
                    </ul>
                    <div className={`${profileStyles["image-upload-button"]}`}>
                      <input
                        id="roomThumbnail"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                          if (e.target.files) {
                            roomListStore.importRoomThumbnail(
                              e.target.files[0]
                            );
                          }
                        }}
                        hidden
                      />
                      <div
                        onClick={() => {
                          document.getElementById("roomThumbnail")!.click();
                        }}
                      >
                        <span className="material-symbols-sharp">image</span>
                        <label className={"typography__text"}>
                          사진 업로드하기
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <NicknameForm />
            </div>

            <OrganizationForm />
          </div>
        </div>
        <div>
          <UserProfileImage userId={user.uid} width={150} height={150} />
          <h1>아이디: {profile.id}</h1>
          <h1>이름: {profile.name}</h1>
          <h1>태그: {profile.tags}</h1>
          <h1>소개: {profile.introduce}</h1>
          <h1>총 공부 시간(분): {profile.totalStudyMinute}</h1>
          <h1>소속: {profile.organizations}</h1>
          <h1>랭킹: {profile.rankingScore}</h1>
        </div>
      </Layout>
      <style jsx>
        {`
          .material-symbols-sharp {
            font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
          }
        `}
      </style>
    </>
  );
});

export default UserProfile;
