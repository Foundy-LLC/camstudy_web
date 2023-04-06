import { NextPage } from "next";
import { observer } from "mobx-react";
import { useStores } from "@/stores/context";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserSearchOverview } from "@/models/user/UserSearchOverview";
import { friendStatus } from "@/constants/FriendStatus";
import friendListIcon from "/public/friend-list/friend-list-icon.png";
import { DEFAULT_THUMBNAIL_URL } from "@/constants/default";
import { UserOverview } from "@/models/user/UserOverview";
import { UserStatus } from "@/models/user/UserStatus";
import friendStyles from "@/styles/friend.module.scss";

const SimilarNamedUser: NextPage<{ item: UserSearchOverview }> = observer(
  ({ item }) => {
    const [statusImage, setStatusImage] = useState<string>(
      "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/add-plus-icon.png"
    );
    const { friendStore } = useStores();
    const { name, id, requestHistory } = item;

    useEffect(() => {
      if (requestHistory === friendStatus.ACCEPTED) {
        setStatusImage(
          "https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/blue-check-mark-icon.png"
        );
      } else if (requestHistory === friendStatus.REQUESTED) {
        setStatusImage(
          "https://uxwing.com/wp-content/themes/uxwing/download/festival-culture-religion/cracker-color-icon.png"
        );
      } else {
        setStatusImage(
          "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/add-plus-icon.png"
        );
      }
    }, [requestHistory]);
    return (
      <>
        <h3 style={{ display: "inline" }}>{name}</h3>{" "}
        <i>#{id.substring(0, 5)}&nbsp;</i>
        <Image
          src={statusImage}
          width={18}
          height={18}
          alt="select"
          onClick={async () => {
            switch (requestHistory) {
              case "ACCEPTED":
                break;
              case "NONE":
                await friendStore.sendFriendRequest(id);
                break;
              case "REQUESTED":
                if (confirm("친구 요청을 취소하시겠어요?") === true) {
                  await friendStore.cancelFriendRequest(id);
                }
                break;
            }
          }}
        />
        <br />
      </>
    );
  }
);

const SimilarNamedUserGroup: NextPage<{ items: UserSearchOverview[] }> =
  observer(({ items }) => {
    return (
      <>
        {items.map((item, key) => (
          <SimilarNamedUser item={item} key={key} />
        ))}
      </>
    );
  });

const FriendRequest: NextPage<{ item: UserOverview }> = observer(({ item }) => {
  const { id, name, profileImage, introduce, status } = item;
  const { friendStore } = useStores();
  return (
    <>
      <Image
        width={50}
        height={50}
        src={profileImage ? profileImage : DEFAULT_THUMBNAIL_URL}
        alt={`${name}-profileImg`}
      />
      <h3>{name}</h3>
      <Image
        width={18}
        height={18}
        src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/accept-icon.png"
        alt="accept"
        onClick={async () => {
          if (confirm("친구 요청을 수락하시겠어요?") === true) {
            await friendStore.acceptFriendRequest(id);
          }
        }}
      />
      <Image
        width={18}
        height={18}
        src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/cancel-icon.png"
        alt="reject"
        onClick={async () => {
          if (confirm("친구 요청을 거절하시겠어요?") === true) {
            await friendStore.refuseFriendRequest(id);
          }
        }}
      />
    </>
  );
});

const FriendRequestGroup: NextPage<{ items: UserOverview[] }> = observer(
  ({ items }) => {
    return (
      <>
        {items.map((item, key) => (
          <FriendRequest item={item} key={key} />
        ))}
      </>
    );
  }
);

const FriendOverview: NextPage<{ item: UserOverview }> = observer(
  ({ item }) => {
    const { friendStore } = useStores();
    const { id, name, profileImage, introduce, status } = item;
    return (
      <div
        className={`${friendStyles["friend-list-form"]} elevation__card__search-bar__contained-button--waiting__etc`}
      >
        <Image
          width={50}
          height={50}
          src={profileImage ? profileImage : DEFAULT_THUMBNAIL_URL}
          alt={`${name}-profileImg`}
          className={`${friendStyles["friend-profile"]} `}
        />
        <div className={`${friendStyles["friend-info"]} typography__text`}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p className={`${friendStyles["friend-name"]} typography__text`}>
              {name}
            </p>{" "}
            {status === UserStatus.LOGIN ? (
              <p
                className={`${friendStyles["friend-status-online"]} typography__caption`}
              >
                접속 중
              </p>
            ) : (
              <p
                className={`${friendStyles["friend-status-offline"]} typography__caption`}
              >
                로그오프
              </p>
            )}{" "}
          </div>
          <p>{introduce}</p>
        </div>

        <h3
          onClick={async () => {
            if (confirm(`${name}을 친구 목록에서 삭제하시겠어요?`) === true) {
              await friendStore.deleteFriend(id);
            }
          }}
        >
          x
        </h3>
      </div>
    );
  }
);

const FriendOverviewGroup: NextPage<{ items: UserOverview[] }> = observer(
  ({ items }) => {
    return (
      <div
        className={`${friendStyles["friend-list-frame"]} elevation__card__search-bar__contained-button--waiting__etc`}
      >
        <div className={`${friendStyles["friend-list-info"]}`}>
          <Image
            src={friendListIcon}
            alt={"friend-list-icon"}
            width={24}
            height={24}
            className={`${friendStyles["friend-list-icon"]}`}
          />
          <label
            className={`${friendStyles["friend-list-label"]} typography__text--big`}
          >
            내 친구
          </label>
        </div>
        <div className={`${friendStyles["friend-list-grid"]}`}>
          {items.map((item, key) => (
            <FriendOverview item={item} key={key} />
          ))}
        </div>
      </div>
    );
  }
);

const friends: NextPage = observer(() => {
  const { friendStore } = useStores();
  const keyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) friendStore.getSimilarNamedUsers();
  };
  return (
    <>
      <input
        type="text"
        placeholder="유저 아이디"
        onChange={(e) => {
          const value = e.target.value;
          if (value) friendStore.changeFriendRequestInput(value);
        }}
        onKeyPress={(event) => keyPressed(event)}
      ></input>
      <button
        onClick={(e) => {
          friendStore.getSimilarNamedUsers();
        }}
      >
        유저 조회
      </button>
      <button
        onClick={(e) => {
          friendStore.fetchFriendRequests();
        }}
      >
        친구 요청 조회
      </button>
      <br />
      <button
        onClick={(e) => {
          friendStore.fetchFriendList();
        }}
      >
        친구 목록 조회
      </button>
      <br />

      {friendStore.successMessage ? (
        <h3>{friendStore.successMessage}</h3>
      ) : null}
      {friendStore.errorMessage ? <h3>{friendStore.errorMessage}</h3> : null}
      <SimilarNamedUserGroup items={friendStore.userSearchOverviews} />
      <FriendRequestGroup items={friendStore.friendRequestUsers} />
      <FriendOverviewGroup items={friendStore.friendOverviews} />
    </>
  );
});
export default friends;
