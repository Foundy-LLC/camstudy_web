import client from "prisma/client";
import { ORGANIZATION_NUM_PER_PAGE } from "@/constants/organization.constant";
import { Simulate } from "react-dom/test-utils";
import { BelongOrganization } from "@/stores/OrganizationStore";

export const updateEmailVerifyStatus = async (
  userId: string,
  organizationId: string
) => {
  return await client.belong.update({
    where: {
      user_id_organization_id: {
        user_id: userId,
        organization_id: organizationId,
      },
    },
    data: { is_authenticated: true },
  });
};

export const addOrganizationEmailVerify = async (
  userId: string,
  email: string,
  organizationId: string
) => {
  await client.belong.create({
    data: {
      user_id: userId,
      organization_id: organizationId,
      email: email,
      is_authenticated: false,
    },
  });
};

export const deleteBelong = async (userId: string, organizationId: string) => {
  await client.belong.delete({
    where: {
      user_id_organization_id: {
        user_id: userId,
        organization_id: organizationId,
      },
    },
  });
};

export const findOrganizations = async (pageNum: number, name?: string) => {
  return await client.organization.findMany({
    skip: pageNum * ORGANIZATION_NUM_PER_PAGE,
    take: ORGANIZATION_NUM_PER_PAGE,
    where: { name: { startsWith: name } },
    orderBy: { name: "asc" },
    select: { id: true, name: true, address: true },
  });
};

export const findBelongOrganizations = async (userId: string) => {
  const result = await client.belong.findMany({
    where: {
      user_id: userId,
      is_authenticated: true,
    },
    orderBy: { organization_id: "asc" },
    select: { organization: { select: { id: true, name: true } } },
  });
  return result.map((item) => {
    const { organization } = item;
    return {
      userId: userId,
      organizationId: organization.id,
      organizationName: organization.name,
    };
  });
};
