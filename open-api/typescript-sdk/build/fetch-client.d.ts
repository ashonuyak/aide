/**
 * Aide
 * 0.0.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
export declare const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders>;
export declare const servers: {
    server1: string;
};
export type LoginDto = {
    email: string;
    password: string;
};
export type SignUpDto = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
};
export type SchemaObjectId = {};
export type DeleteCampaignDto = {
    _id: SchemaObjectId;
};
export type AdditionalLinkDto = {
    key: string;
    value: string;
};
export type CategoryAddOns = {
    region?: string;
};
export type UserMappedDto = {
    _id: string;
    avatarUrl?: string;
    blocked?: boolean;
    createdAt: string;
    email: string;
    firstName?: string;
    initials: string;
    lastName?: string;
    role: Role;
    username: string;
};
export type PaymentCardDto = {
    key: string;
    value: string;
};
export type ScheduleDto = {
    end: string;
    start: string;
};
export type CampaignResponseDto = {
    _id: string;
    additionalLinks: AdditionalLinkDto[];
    categoryAddOns: CategoryAddOns;
    categoryId: string;
    currency?: string;
    currentAmount?: number;
    description: string;
    endDate?: string;
    fundraiser: UserMappedDto;
    fundraiserId: string;
    goalAmount?: number;
    mainImage: string;
    media: string[];
    payPalEnabled: boolean;
    paymentCards: PaymentCardDto[];
    qrCode: string | null;
    qrCodeUrl: string | null;
    schedule?: ScheduleDto;
    startDate?: string;
    status: Status;
    subtitle: string;
    title: string;
};
export type UpdateCampaignDto = {
    _id: SchemaObjectId;
};
export type CreateCampaignDto = {
    additionalLinks?: AdditionalLinkDto[];
    categoryAddOns?: CategoryAddOns;
    categoryId: SchemaObjectId;
    currency?: string;
    description: string;
    goalAmount?: number;
    payPalEnabled: boolean;
    paymentCards?: PaymentCardDto[];
    qrCodeUrl?: string;
    schedule?: ScheduleDto;
    status: Status;
    subtitle?: string;
    title: string;
};
export type FundraiserCampaignResponseDto = {
    _id: string;
    additionalLinks: AdditionalLinkDto[];
    categoryAddOns: CategoryAddOns;
    categoryId: string;
    currency?: string;
    currentAmount?: number;
    description: string;
    endDate?: string;
    fundraiserId: string;
    goalAmount?: number;
    mainImage: string;
    media: string[];
    payPalEnabled: boolean;
    paymentCards: PaymentCardDto[];
    qrCode: string | null;
    qrCodeUrl: string | null;
    schedule?: ScheduleDto;
    startDate?: string;
    status: Status;
    subtitle: string;
    title: string;
};
export type UpdateCampaignStatusDto = {
    _id: SchemaObjectId;
    status: Status;
};
export type GetCategoryDto = {
    _id: string;
    color: string;
    handle: string;
    mediaUrl?: string;
    order: number;
    subtitle: string;
    title: string;
};
export type CreateCategoryDto = {
    color: string;
    handle: string;
    mediaUrl?: string;
    subtitle: string;
    title: string;
};
export type UpdateCategoryDto = {
    _id: string;
    color?: string;
    handle?: string;
    mediaUrl?: string;
    subtitle?: string;
    title?: string;
};
export type GetAuthResponseDto = {
    url: string;
};
export type TrackMetadataDto = {
    campaignId?: string;
    categoryId?: string;
};
export type TrackStatisticDto = {
    categoryClick?: number;
    click?: number;
    impression?: number;
    metadata: TrackMetadataDto;
    timestamp?: string;
};
export declare function getHello(opts?: Oazapfts.RequestOpts): Promise<string>;
export declare function login({ loginDto }: {
    loginDto: LoginDto;
}, opts?: Oazapfts.RequestOpts): Promise<object>;
export declare function logout(opts?: Oazapfts.RequestOpts): Promise<object>;
export declare function signUp({ signUpDto }: {
    signUpDto: SignUpDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function deleteCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function getCampaignById({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts): Promise<CampaignResponseDto>;
export declare function updateCampaign({ updateCampaignDto }: {
    updateCampaignDto: UpdateCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<object>;
export declare function createCampaign({ createCampaignDto }: {
    createCampaignDto: CreateCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<FundraiserCampaignResponseDto>;
export declare function getAllCampaigns({ search }: {
    search: string;
}, opts?: Oazapfts.RequestOpts): Promise<FundraiserCampaignResponseDto[]>;
export declare function blockCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function getMyCampaigns({ search, status }: {
    search: string;
    status: string;
}, opts?: Oazapfts.RequestOpts): Promise<FundraiserCampaignResponseDto[]>;
export declare function getCampaignsByCategoryHandle({ categoryHandle, search, region }: {
    categoryHandle: string;
    search: string;
    region: string;
}, opts?: Oazapfts.RequestOpts): Promise<CampaignResponseDto[]>;
export declare function updateCampaigns(opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function updateCampaignStatus({ updateCampaignStatusDto }: {
    updateCampaignStatusDto: UpdateCampaignStatusDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function unblockCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function getCategoryById(opts?: Oazapfts.RequestOpts): Promise<GetCategoryDto>;
export declare function createCategory({ createCategoryDto }: {
    createCategoryDto: CreateCategoryDto;
}, opts?: Oazapfts.RequestOpts): Promise<GetCategoryDto>;
export declare function updateCategory({ updateCategoryDto }: {
    updateCategoryDto: UpdateCategoryDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function getAdminCategories(opts?: Oazapfts.RequestOpts): Promise<GetCategoryDto[]>;
export declare function getAllCategories(opts?: Oazapfts.RequestOpts): Promise<GetCategoryDto[]>;
export declare function getAuth(opts?: Oazapfts.RequestOpts): Promise<GetAuthResponseDto>;
export declare function getToken({ code }: {
    code: string;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function clearAllUserSessions({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function merge({ range }: {
    range: string;
}, opts?: Oazapfts.RequestOpts): Promise<object[]>;
export declare function getTopCampaigns({ $type }: {
    $type: string;
}, opts?: Oazapfts.RequestOpts): Promise<object[]>;
export declare function getTopCampaignsCategory({ $type, categoryId }: {
    $type: string;
    categoryId: string;
}, opts?: Oazapfts.RequestOpts): Promise<object[]>;
export declare function trackStatistic({ $type, trackStatisticDto }: {
    $type: string;
    trackStatisticDto: TrackStatisticDto;
}, opts?: Oazapfts.RequestOpts): Promise<object>;
export declare function blockFundraiser({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare function getFundraisers({ search }: {
    search: string;
}, opts?: Oazapfts.RequestOpts): Promise<UserMappedDto[]>;
export declare function getMyself(opts?: Oazapfts.RequestOpts): Promise<UserMappedDto>;
export declare function unblockFundraiser({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts): Promise<never>;
export declare enum Role {
    User = "user",
    Fundraiser = "fundraiser",
    Admin = "admin"
}
export declare enum Status {
    Draft = "draft",
    Active = "active",
    Paused = "paused",
    Deleted = "deleted",
    Closed = "closed"
}
