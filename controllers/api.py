import tempfile

def get_users():
    users = []
    show = False
    current_user_email = auth.user.email if auth.user is not None else None
    if current_user_email == "g@soe.edu":
        show = True
        for r in db(db.contact_info).select(orderby=~db.contact_info.sent_on):
            t = dict(
                name = r.name,
                email = r.email,
                phone_number = r.phone_number,
                org = r.org,
                reason = r.reason,
                sent_on = r.sent_on,
            )
            users.append(t)
    return response.json(dict(users = users,
     current_user_email = current_user_email,
     show = show))

def sign_up_user():
    t_id = db.contact_info.insert(
        name = request.vars.name,
        email = request.vars.email,
        phone_number = request.vars.phone_number,
        org = request.vars.org,
        reason = request.vars.reason,
    )
    t = db.contact_info(t_id);
    return response.json(dict(users = t))
    
