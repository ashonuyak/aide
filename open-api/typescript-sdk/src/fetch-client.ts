/**
 * Aide
 * 0.0.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "/api",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "/api"
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
export function getHello(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: string;
    }>("/", {
        ...opts
    }));
}
export function login({ loginDto }: {
    loginDto: LoginDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: object;
    }>("/auth/login", oazapfts.json({
        ...opts,
        method: "POST",
        body: loginDto
    })));
}
export function logout(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: object;
    }>("/auth/logout", {
        ...opts,
        method: "DELETE"
    }));
}
export function signUp({ signUpDto }: {
    signUpDto: SignUpDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/auth/sign-up", oazapfts.json({
        ...opts,
        method: "POST",
        body: signUpDto
    })));
}
export function deleteCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: deleteCampaignDto
    })));
}
export function getCampaignById({ id }: {
    id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CampaignResponseDto;
    }>(`/campaign${QS.query(QS.explode({
        id
    }))}`, {
        ...opts
    }));
}
export function updateCampaign({ updateCampaignDto }: {
    updateCampaignDto: UpdateCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: object;
    }>("/campaign", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCampaignDto
    })));
}
export function createCampaign({ createCampaignDto }: {
    createCampaignDto: CreateCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: FundraiserCampaignResponseDto;
    }>("/campaign", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCampaignDto
    })));
}
export function getAllCampaigns({ search }: {
    search: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FundraiserCampaignResponseDto[];
    }>(`/campaign/all${QS.query(QS.explode({
        search
    }))}`, {
        ...opts
    }));
}
export function blockCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/block", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: deleteCampaignDto
    })));
}
export function getMyCampaigns({ search, status }: {
    search: string;
    status: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FundraiserCampaignResponseDto[];
    }>(`/campaign/fundraiser${QS.query(QS.explode({
        search,
        status
    }))}`, {
        ...opts
    }));
}
export function getCampaignsByCategoryHandle({ categoryHandle, search, region }: {
    categoryHandle: string;
    search: string;
    region: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CampaignResponseDto[];
    }>(`/campaign/handle${QS.query(QS.explode({
        "category-handle": categoryHandle,
        search,
        region
    }))}`, {
        ...opts
    }));
}
export function updateCampaigns(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/postman", {
        ...opts,
        method: "PATCH"
    }));
}
export function updateCampaignStatus({ updateCampaignStatusDto }: {
    updateCampaignStatusDto: UpdateCampaignStatusDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/status", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCampaignStatusDto
    })));
}
export function unblockCampaign({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/unblock", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: deleteCampaignDto
    })));
}
export function getCategoryById(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetCategoryDto;
    }>("/category", {
        ...opts
    }));
}
export function createCategory({ createCategoryDto }: {
    createCategoryDto: CreateCategoryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: GetCategoryDto;
    }>("/category", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCategoryDto
    })));
}
export function updateCategory({ updateCategoryDto }: {
    updateCategoryDto: UpdateCategoryDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/category", oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateCategoryDto
    })));
}
export function getAdminCategories(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetCategoryDto[];
    }>("/category/admin/all", {
        ...opts
    }));
}
export function getAllCategories(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetCategoryDto[];
    }>("/category/all", {
        ...opts
    }));
}
export function getAuth(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetAuthResponseDto;
    }>("/oauth", {
        ...opts
    }));
}
export function getToken({ code }: {
    code: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/oauth/callback${QS.query(QS.explode({
        code
    }))}`, {
        ...opts
    }));
}
export function clearAllUserSessions({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/session/all", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: deleteCampaignDto
    })));
}
export function merge({ range }: {
    range: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: object[];
    }>(`/statistic/merge/${encodeURIComponent(range)}`, {
        ...opts,
        method: "POST"
    }));
}
export function getTopCampaigns({ $type }: {
    $type: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: object[];
    }>(`/statistic/top-campaigns${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
export function getTopCampaignsCategory({ $type, categoryId }: {
    $type: string;
    categoryId: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: object[];
    }>(`/statistic/top-campaigns-category${QS.query(QS.explode({
        "type": $type,
        categoryId
    }))}`, {
        ...opts
    }));
}
export function trackStatistic({ $type, trackStatisticDto }: {
    $type: string;
    trackStatisticDto: TrackStatisticDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
        data: object;
    }>(`/statistic/${encodeURIComponent($type)}`, oazapfts.json({
        ...opts,
        method: "POST",
        body: trackStatisticDto
    })));
}
export function blockFundraiser({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/user/block", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: deleteCampaignDto
    })));
}
export function getFundraisers({ search }: {
    search: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserMappedDto[];
    }>(`/user/fundraisers${QS.query(QS.explode({
        search
    }))}`, {
        ...opts
    }));
}
export function getMyself(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserMappedDto;
    }>("/user/me", {
        ...opts
    }));
}
export function unblockFundraiser({ deleteCampaignDto }: {
    deleteCampaignDto: DeleteCampaignDto;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/user/unblock", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: deleteCampaignDto
    })));
}
export enum Role {
    User = "user",
    Fundraiser = "fundraiser",
    Admin = "admin"
}
export enum Status {
    Draft = "draft",
    Active = "active",
    Paused = "paused",
    Deleted = "deleted",
    Closed = "closed"
}
