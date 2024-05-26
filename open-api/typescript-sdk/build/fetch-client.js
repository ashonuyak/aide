/**
 * Aide
 * 0.0.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults = {
    headers: {},
    baseUrl: "/api",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "/api"
};
export function getHello(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/", {
        ...opts
    }));
}
export function login({ loginDto }, opts) {
    return oazapfts.ok(oazapfts.fetchJson("/auth/login", oazapfts.json({
        ...opts,
        method: "POST",
        body: loginDto
    })));
}
export function signUp({ signUpDto }, opts) {
    return oazapfts.ok(oazapfts.fetchText("/auth/sign-up", oazapfts.json({
        ...opts,
        method: "POST",
        body: signUpDto
    })));
}
export function deleteCampaign({ deleteCampaignDto }, opts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: deleteCampaignDto
    })));
}
export function getCampaignById({ id }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/campaign${QS.query(QS.explode({
        id
    }))}`, {
        ...opts
    }));
}
export function updateCampaign({ updateCampaignDto }, opts) {
    return oazapfts.ok(oazapfts.fetchJson("/campaign", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCampaignDto
    })));
}
export function createCampaign({ createCampaignDto }, opts) {
    return oazapfts.ok(oazapfts.fetchJson("/campaign", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCampaignDto
    })));
}
export function getAllCampaigns({ search }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/campaign/all${QS.query(QS.explode({
        search
    }))}`, {
        ...opts
    }));
}
export function getMyCampaigns({ search, status }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/campaign/fundraiser${QS.query(QS.explode({
        search,
        status
    }))}`, {
        ...opts
    }));
}
export function getCampaignsByCategoryHandle({ categoryHandle, search }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/campaign/handle${QS.query(QS.explode({
        "category-handle": categoryHandle,
        search
    }))}`, {
        ...opts
    }));
}
export function updateCampaigns(opts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/postman", {
        ...opts,
        method: "PATCH"
    }));
}
export function updateCampaignStatus({ updateCampaignStatusDto }, opts) {
    return oazapfts.ok(oazapfts.fetchText("/campaign/status", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCampaignStatusDto
    })));
}
export function getCategoryById(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/category", {
        ...opts
    }));
}
export function createCategory({ createCategoryDto }, opts) {
    return oazapfts.ok(oazapfts.fetchJson("/category", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCategoryDto
    })));
}
export function updateCategory({ updateCategoryDto }, opts) {
    return oazapfts.ok(oazapfts.fetchText("/category", oazapfts.json({
        ...opts,
        method: "PUT",
        body: updateCategoryDto
    })));
}
export function getAllCategories(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/category/all", {
        ...opts
    }));
}
export function getAuth(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/oauth", {
        ...opts
    }));
}
export function getToken({ code }, opts) {
    return oazapfts.ok(oazapfts.fetchText(`/oauth/callback${QS.query(QS.explode({
        code
    }))}`, {
        ...opts
    }));
}
export function getAuth2(opts) {
    return oazapfts.ok(oazapfts.fetchText("/stripe", {
        ...opts
    }));
}
export function createAccount(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/stripe/accounts", {
        ...opts,
        method: "POST"
    }));
}
export function donate({ accountId }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/stripe/donate/${encodeURIComponent(accountId)}`, {
        ...opts,
        method: "POST"
    }));
}
export function handleOAuthCallback({ code, state }, opts) {
    return oazapfts.ok(oazapfts.fetchText(`/stripe/oauth/callback${QS.query(QS.explode({
        code,
        state
    }))}`, {
        ...opts
    }));
}
export function handleWebhook(opts) {
    return oazapfts.ok(oazapfts.fetchText("/stripe/webhook", {
        ...opts,
        method: "POST"
    }));
}
export function getFundraisers({ search }, opts) {
    return oazapfts.ok(oazapfts.fetchJson(`/user/fundraisers${QS.query(QS.explode({
        search
    }))}`, {
        ...opts
    }));
}
export function getMyself(opts) {
    return oazapfts.ok(oazapfts.fetchJson("/user/me", {
        ...opts
    }));
}
export var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Fundraiser"] = "fundraiser";
    Role["Admin"] = "admin";
})(Role || (Role = {}));
export var Status;
(function (Status) {
    Status["Draft"] = "draft";
    Status["Active"] = "active";
    Status["Paused"] = "paused";
    Status["Deleted"] = "deleted";
    Status["Closed"] = "closed";
})(Status || (Status = {}));
