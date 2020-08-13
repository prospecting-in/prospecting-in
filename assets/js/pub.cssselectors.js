//{"version":"1.0.5","shasum":"93852466e51ed916b58bf689151732a225c4870f"}
class CSSSelectors {
    static linkedin = class {
        static urnLiActivity = class {
            static getAccount() {
                let account = document.querySelector('.feed-shared-actor a').href.split('?');
                if (account.length > 0) {
                    account = account[0];
                }
                account = account.split('?')[0].split("/")[4];
                return account;
            }
            static getPostIdentifier() {
                return location.href.replace(Config.server.linkedin.getFeedUpdatePage(), "").replace("/", "").replace("urn:li:activity:", "");
            }

            static reactions = class {
                static open() {
                    document.querySelector('li.social-details-social-counts__item > button > span').click();
                }
                static getTotal() {
                    let total = 0;
                    try {
                        total = document.querySelector('.social-details-social-counts__reactions-count').innerText;
                    } catch (error) {

                    }
                    return total;
                }
                static bump() {
                    let height = document.querySelectorAll('#artdeco-modal-outlet ul')[0].parentElement.offsetHeight
                    document.querySelectorAll('#artdeco-modal-outlet ul')[0].parentElement.parentElement.scrollTop = height;
                }
                static getAllReactions() {
                    return document.querySelectorAll('#artdeco-modal-outlet ul li');
                }
                static getName(reaction) {
                    return reaction.querySelector('.artdeco-entity-lockup__title').innerText;
                }
                static getDescripton(reaction) {
                    return reaction.querySelector('.artdeco-entity-lockup__caption').innerText;
                }
                static getType(reaction) {
                    return reaction.querySelector('img.reactions-icon').alt;
                }
                static getUrl(reaction) {
                    return reaction.querySelector('a').href;
                }
            }

            static comments = class {
                static clickMoreButton() {
                    let button = document.querySelector(".comments-comments-list__load-more-comments-button");
                    if (button) {
                        button.click();
                    } else {
                        throw "No button";
                    }
                }
                static getUrl(comment) {
                    return comment.querySelector('a').href;
                }
                static getName(comment) {
                    return comment.querySelector('.hoverable-link-text').textContent;
                }
                static getDescription(comment) {
                    return comment.querySelector('.comments-post-meta__headline').textContent.trim();
                }
                static getAllComments() {
                    return document.querySelectorAll(".comments-comments-list  article");
                }
                static getTotalComments(defaultval) {
                    try {
                        return document.querySelectorAll('ul.social-details-social-counts li')[1].textContent.trim().split(" ")[0];
                    } catch (error) { console.log(error); return defaultval }
                }
                static getIdFromComment(comment) {
                    try {
                        if (comment.dataset.id.startsWith('urn:li:comment:(activity:')) {
                            return comment.dataset.id;
                        } else { return false; }
                    } catch (error) { return false; }
                }
            }
        }

        static detailRecentActivity = class {
            static getActivityHeader(activity) {
                return activity.querySelectorAll('.feed-shared-header__text-view a');
            }
            static getProfileUrl(activity) {
                try {
                    let profileurl = activity.querySelector('.feed-shared-actor > a').href;// this is the poster
                    if (profileurl.split('?').length > 1) {
                        profileurl = profileurl.split('?')[0] + "/";
                    }
                    let activityHeader = CSSSelectors.linkedin.detailRecentActivity.getActivityHeader(activity);
                    if (activityHeader.length > 1) {
                        profileurl = activityHeader[1].href; // if there is a third party take that name 
                    }
                    return profileurl;
                } catch (error) { }
                return "";
            }
            static getPerson(activity) {
                try {
                    let person = activity.querySelector('.feed-shared-actor a .feed-shared-actor__name').innerText;// this is the poster
                    let activityHeader = CSSSelectors.linkedin.detailRecentActivity.getActivityHeader(activity);
                    if (activityHeader.length > 1) {
                        person = activityHeader[1].innerText; // if there is a third party take that name 
                    }
                    return person;
                } catch (err) { }
                return "";
            }
            static getAllActivities() {
                return document.querySelectorAll('#voyager-feed .feed-shared-update-v2');
            }
            static getIdFromActivity(activity) {
                let urn = 'urn:li:activity:';
                var id = false;
                try {
                    id = activity.dataset.urn;
                } catch (error) {
                    id = false;
                }
                if (!id.startsWith(urn)) return false;
                return id.replace(urn, "");
            }
            static getActivityMessage(activity) {
                try {
                    return activity.querySelector('.feed-shared-header').innerText;
                } catch (err) { }
                return "";
            }
        }

        static detailRecentActivityShares = class {
            static getPosts() {
                return document.querySelectorAll('.feed-shared-update-v2');
            }
            static getFirstName() {
                try {
                    return document.querySelector('.pv-recent-activity-top-card__info .single-line-truncate').innerText.replace('<!---->', '').trim();
                } catch (error) { return ""; }
            }
            static getSocialCountsDiv(element) {
                if (element) return element.getElementsByClassName('social-details-social-counts')[0];
            }
            static getNrEndDate(element) {
                var endDate = element.querySelector('.feed-shared-actor__sub-description').innerText;
                endDate = endDate.replace(/(\r\n|\n|\r)/gm, '');
                endDate = endDate.replace(' • ', '');
                endDate = endDate.replace('Published • ', '');
                endDate = endDate.replace(' • Edited', '');
                var parsedEndDate = endDate.split(' ');
                if (parsedEndDate.length > 1) {
                    endDate = parsedEndDate[0];
                }
                endDate = endDate.trim();
                var nrEndDate = CSSSelectors.linkedin.detailRecentActivityShares.getNumberFromEndDate(endDate);
                return nrEndDate;
            }
            static getDescription() {
                if (document.querySelector('#recent-activity-top-card > div.pv-recent-activity-top-card__info > h4')) {
                    return document.querySelector('#recent-activity-top-card > div.pv-recent-activity-top-card__info > h4').innerText;
                }
                return "";
            }
            static hasFollowers() {
                if (!document.querySelectorAll('.pv-recent-activity-top-card__extra-info .text-align-right')[0]) location.href = "https://www.linkedin.com/feed/#continue"; //no followers on this page needs fix
            }
            static getFollowerNumber() {
                if (document.querySelectorAll('.pv-recent-activity-top-card__extra-info .text-align-right').length != 1) return 0;
                var followers = document.querySelectorAll('.pv-recent-activity-top-card__extra-info .text-align-right')[0].innerText;
                followers = followers.replace(/\,/g, '');
                var followersNumber = parseInt(followers, 10);
                return followersNumber;
            }
            static getNumberFromEndDate(endDate) {
                if (!endDate) return 0;
                if (endDate.endsWith("d")) {
                    return parseInt(endDate.replace('d', ''));
                }
                if (endDate.endsWith("w")) {
                    return parseInt(endDate.replace('w', '')) * 7;
                }
                if (endDate.endsWith("mo")) {
                    return parseInt(endDate.replace('mo', '')) * 30;
                }
                if (endDate.endsWith("yr")) {
                    return parseInt(endDate.replace('yr', '')) * 365;
                }
                return 0;
            }
            static getIdFromPost(post) {
                try {
                    let urn = 'urn:li:activity:';
                    let id = post.dataset.urn;
                    if (!id.startsWith(urn)) return false;
                    return id.replace(urn, "");
                } catch (error) { return false; }
            }
            static getFirstLine(post) {
                try {
                    return post.querySelector('.feed-shared-text').textContent.trim().substring(0, 50);
                } catch (error) { return ""; }
            }
            static getReactions(post) {
                try {
                    return post.querySelector('.social-details-social-counts__reactions').textContent.trim();
                } catch (error) { return 0; }
            }
            static getComments(post) {
                try {
                    return post.querySelector('.social-details-social-counts__comments').textContent.trim().replace(" Comments", "").replace(" Comment", "");
                } catch (error) { return 0; }
            }
            static getViews(post) {
                try {
                    let views = post.querySelector('.content-analytics-entry-point').textContent.trim().split(" ");
                    if (views.length > 1) {
                        views = views[0];
                    }
                    return views;
                } catch (error) { return 0; }
            }
        }

        static notifications = class {
            static getNotification(nr) {
                return document.querySelectorAll('.artdeco-card > .ember-view')[nr];
            }
            static getTimeStampFromNotification(notification) {
                if (!notification.querySelector('.nt-card__time-ago')) return false;
                return notification.querySelector('.nt-card__time-ago').innerHTML.trim();
            }
            static getProfileUrl(notification) {
                return notification.querySelector('.nt-card__left-rail > a').href;
            }
            static getNotificationMessage(notification) {
                return notification.querySelector('.nt-card__headline .visually-hidden').innerText;
            }
        }
    }
}