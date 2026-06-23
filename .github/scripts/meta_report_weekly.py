import os
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta

TOKEN = os.environ["META_TOKEN"]
AD_ACCOUNT = "act_2534496703434722"
CAMPAIGN_ID = "120252337530160110"

def get_insights_weekly():
    url = f"https://graph.facebook.com/v20.0/{AD_ACCOUNT}/insights"
    params = {
        "fields": "ad_name,spend,clicks,impressions,cpc,ctr,reach,actions",
        "date_preset": "last_week_mon_sun",
        "level": "ad",
        "filtering": f'[{{"field":"campaign.id","operator":"EQUAL","value":"{CAMPAIGN_ID}"}}]',
        "access_token": TOKEN,
    }
    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json().get("data", [])

def get_insights_prev_week():
    """Semana anterior para comparação (última segunda a domingo antes da semana passada)."""
    today = datetime.now()
    # semana passada: última seg-dom
    last_mon = today - timedelta(days=today.weekday() + 7)
    last_sun = last_mon + timedelta(days=6)
    # semana anterior a essa
    prev_mon = last_mon - timedelta(days=7)
    prev_sun = last_sun - timedelta(days=7)

    url = f"https://graph.facebook.com/v20.0/{AD_ACCOUNT}/insights"
    params = {
        "fields": "spend,clicks,reach,actions",
        "time_range": f'{{"since":"{prev_mon.strftime("%Y-%m-%d")}","until":"{prev_sun.strftime("%Y-%m-%d")}"}',
        "level": "campaign",
        "filtering": f'[{{"field":"campaign.id","operator":"EQUAL","value":"{CAMPAIGN_ID}"}}]',
        "access_token": TOKEN,
    }
    r = requests.get(url, params=params)
    r.raise_for_status()
    data = r.json().get("data", [])
    return data[0] if data else {}

def get_campaign_status():
    url = f"https://graph.facebook.com/v20.0/{CAMPAIGN_ID}"
    params = {"fields": "name,status,effective_status,daily_budget", "access_token": TOKEN}
    r = requests.get(url, params=params)
    r.raise_for_status()
    return r.json()

def get_action(actions, action_type):
    if not actions:
        return 0
    for a in actions:
        if a.get("action_type") == action_type:
            return int(float(a.get("value", 0)))
    return 0

def fmt_brl(value):
    try:
        return f"R$ {float(value):.2f}".replace(".", ",")
    except (ValueError, TypeError):
        return "—"

def fmt_pct(value):
    try:
        return f"{float(value):.2f}%".replace(".", ",")
    except (ValueError, TypeError):
        return "—"

def delta_badge(current, previous, invert=False):
    """Retorna badge HTML com variação % vs semana anterior."""
    if not previous or previous == 0:
        return ""
    pct = ((current - previous) / previous) * 100
    if invert:
        good = pct < 0
    else:
        good = pct >= 0
    color = "#2e7d32" if good else "#c62828"
    sign = "+" if pct >= 0 else ""
    return f'<span style="font-size:11px;color:{color};font-weight:600">{sign}{pct:.1f}% vs sem. ant.</span>'

def get_week_label():
    today = datetime.now()
    last_mon = today - timedelta(days=today.weekday() + 7)
    last_sun = last_mon + timedelta(days=6)
    return last_mon.strftime("%d/%m"), last_sun.strftime("%d/%m/%Y")

def build_html(ads, campaign, prev_week, week_start, week_end):
    total_spend = sum(float(a.get("spend", 0)) for a in ads)
    total_clicks = sum(int(a.get("clicks", 0)) for a in ads)
    total_impressions = sum(int(a.get("impressions", 0)) for a in ads)
    total_reach = sum(int(a.get("reach", 0)) for a in ads)
    total_site_visits = sum(get_action(a.get("actions"), "landing_page_view") for a in ads)
    total_whatsapp = sum(get_action(a.get("actions"), "offsite_conversion.fb_pixel_contact") for a in ads)

    prev_spend = float(prev_week.get("spend", 0))
    prev_clicks = int(prev_week.get("clicks", 0))
    prev_reach = int(prev_week.get("reach", 0))
    prev_whatsapp = get_action(prev_week.get("actions"), "offsite_conversion.fb_pixel_contact")
    prev_site_visits = get_action(prev_week.get("actions"), "landing_page_view")

    custo_por_visita = f"R$ {total_spend / total_site_visits:.2f}".replace(".", ",") if total_site_visits else "—"

    status_map = {
        "ACTIVE": ("🟢", "Ativa"),
        "PAUSED": ("⏸️", "Pausada"),
        "DISAPPROVED": ("🔴", "Reprovada"),
        "IN_PROCESS": ("🔄", "Em processo"),
    }
    status_icon, status_label = status_map.get(
        campaign.get("effective_status", ""), ("⚪", campaign.get("effective_status", "—"))
    )

    daily_budget = campaign.get("daily_budget")
    budget_str = f"R$ {int(daily_budget) / 100:.0f}/dia" if daily_budget else "—"

    rows = ""
    for ad in ads:
        name = ad.get("ad_name", "—")
        spend = float(ad.get("spend", 0))
        clicks = int(ad.get("clicks", 0))
        impressions = int(ad.get("impressions", 0))
        cpc = fmt_brl(ad.get("cpc"))
        ctr = fmt_pct(ad.get("ctr"))
        site_visits = get_action(ad.get("actions"), "landing_page_view")
        whatsapp = get_action(ad.get("actions"), "offsite_conversion.fb_pixel_contact")

        max_clicks = max((int(a.get("clicks", 0)) for a in ads), default=0)
        bg = "#fffbf0" if clicks == max_clicks and clicks > 0 else "#ffffff"

        rows += f"""
        <tr style="background:{bg}">
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;font-size:13px">{name}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center;font-weight:600">R$ {spend:.2f}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{clicks}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{site_visits}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center;color:#1b5e20;font-weight:600">{whatsapp}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{cpc}</td>
            <td style="padding:12px 10px;border-bottom:1px solid #f0ebe0;text-align:center">{ctr}</td>
        </tr>"""

    if not ads:
        rows = '<tr><td colspan="7" style="padding:24px;text-align:center;color:#999;font-size:13px">Nenhum dado para a semana.</td></tr>'

    has_prev = bool(prev_week)

    return f"""<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:700px;margin:0 auto">

  <!-- Header -->
  <tr><td style="background:#1C0F07;padding:28px 32px">
    <p style="margin:0;color:#C4933A;font-size:11px;letter-spacing:4px;text-transform:uppercase">Borges Assessoria · Relatório Semanal</p>
    <h1 style="margin:8px 0 4px;color:#fff;font-size:28px;font-style:italic;font-weight:400">Resumo da Semana</h1>
    <p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px">{week_start} a {week_end} · {campaign.get("name","—")}</p>
  </td></tr>

  <!-- Status bar -->
  <tr><td style="background:#C4933A;padding:10px 32px">
    <p style="margin:0;color:#fff;font-size:13px">
      Status: <strong>{status_icon} {status_label}</strong> &nbsp;|&nbsp; Orçamento: <strong>{budget_str}</strong>
    </p>
  </td></tr>

  <!-- Funil semanal -->
  <tr><td style="padding:28px 32px 8px;background:#fff">
    <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#1C0F07;text-transform:uppercase;letter-spacing:1px">Funil da semana</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="text-align:center;padding:0 4px">
          <div style="background:#f5f0e8;padding:14px 8px;border-radius:4px">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Alcance</p>
            <p style="margin:4px 0 2px;font-size:22px;font-weight:700;color:#1C0F07">{total_reach:,}</p>
            {delta_badge(total_reach, prev_reach) if has_prev else ""}
          </div>
        </td>
        <td style="text-align:center;font-size:18px;color:#C4933A;width:18px">›</td>
        <td style="text-align:center;padding:0 4px">
          <div style="background:#f5f0e8;padding:14px 8px;border-radius:4px">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Cliques</p>
            <p style="margin:4px 0 2px;font-size:22px;font-weight:700;color:#1C0F07">{total_clicks}</p>
            {delta_badge(total_clicks, prev_clicks) if has_prev else ""}
          </div>
        </td>
        <td style="text-align:center;font-size:18px;color:#C4933A;width:18px">›</td>
        <td style="text-align:center;padding:0 4px">
          <div style="background:#e8f0e8;padding:14px 8px;border-radius:4px;border-left:3px solid #4CAF50">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Visitas site</p>
            <p style="margin:4px 0 2px;font-size:22px;font-weight:700;color:#2e7d32">{total_site_visits}</p>
            {delta_badge(total_site_visits, prev_site_visits) if has_prev else ""}
          </div>
        </td>
        <td style="text-align:center;font-size:18px;color:#C4933A;width:18px">›</td>
        <td style="text-align:center;padding:0 4px">
          <div style="background:#e8f5e9;padding:14px 8px;border-radius:4px;border-left:3px solid #25D366">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">WhatsApp</p>
            <p style="margin:4px 0 2px;font-size:22px;font-weight:700;color:#1b5e20">{total_whatsapp}</p>
            {delta_badge(total_whatsapp, prev_whatsapp) if has_prev else ""}
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- KPIs resumo -->
  <tr><td style="padding:16px 32px 24px;background:#fff">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="25%" style="padding-right:8px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Gasto Total</p>
            <p style="margin:6px 0 4px;font-size:20px;font-weight:700;color:#1C0F07">R$ {total_spend:.2f}</p>
            {delta_badge(total_spend, prev_spend, invert=True) if has_prev else ""}
          </div>
        </td>
        <td width="25%" style="padding-right:8px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Impressões</p>
            <p style="margin:6px 0 4px;font-size:20px;font-weight:700;color:#1C0F07">{total_impressions:,}</p>
          </div>
        </td>
        <td width="25%" style="padding-right:8px">
          <div style="background:#f5f0e8;padding:16px;border-left:3px solid #C4933A">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Custo/Visita</p>
            <p style="margin:6px 0 4px;font-size:20px;font-weight:700;color:#1C0F07">{custo_por_visita}</p>
          </div>
        </td>
        <td width="25%">
          <div style="background:#{'e8f5e9' if total_whatsapp > 0 else 'f5f0e8'};padding:16px;border-left:3px solid #{'25D366' if total_whatsapp > 0 else 'C4933A'}">
            <p style="margin:0;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Contatos WA</p>
            <p style="margin:6px 0 4px;font-size:20px;font-weight:700;color:#{'1b5e20' if total_whatsapp > 0 else '1C0F07'}">{total_whatsapp}</p>
            {delta_badge(total_whatsapp, prev_whatsapp) if has_prev else ""}
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Tabela por anúncio -->
  <tr><td style="padding:0 32px 8px;background:#fff">
    <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#1C0F07;text-transform:uppercase;letter-spacing:1px">Desempenho por anúncio</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <thead>
        <tr style="background:#f5f0e8">
          <th style="padding:10px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Anúncio</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Gasto</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Cliques</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">Visitas</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">WhatsApp</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">CPC</th>
          <th style="padding:10px;text-align:center;font-size:11px;text-transform:uppercase;color:#999;font-weight:600">CTR</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    <p style="margin:10px 0 0;font-size:11px;color:#bbb">⭐ Linha destacada = melhor desempenho da semana</p>
  </td></tr>

  <!-- Análise rápida -->
  <tr><td style="padding:24px 32px;background:#f9f6f1;border-top:2px solid #f0ebe0">
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1C0F07;text-transform:uppercase;letter-spacing:1px">Referências para imóveis</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:6px 12px 6px 0;vertical-align:top;width:50%">
          <p style="margin:0;font-size:13px"><span style="color:#C4933A;font-weight:700">CPC bom</span>
          <br><span style="color:#555;font-size:12px">Abaixo de R$ 1,00 é excelente para imóveis.</span></p>
        </td>
        <td style="padding:6px 0 6px 12px;vertical-align:top;width:50%">
          <p style="margin:0;font-size:13px"><span style="color:#C4933A;font-weight:700">CTR bom</span>
          <br><span style="color:#555;font-size:12px">Acima de 2% já é considerado bom.</span></p>
        </td>
      </tr>
      <tr>
        <td style="padding:6px 12px 6px 0;vertical-align:top">
          <p style="margin:0;font-size:13px"><span style="color:#C4933A;font-weight:700">Conversão normal</span>
          <br><span style="color:#555;font-size:12px">Imóveis de alto valor: 0,1%–1% de visita → contato é esperado.</span></p>
        </td>
        <td style="padding:6px 0 6px 12px;vertical-align:top">
          <p style="margin:0;font-size:13px"><span style="color:#C4933A;font-weight:700">Otimização</span>
          <br><span style="color:#555;font-size:12px">Meta precisa de 50 eventos Contact para otimizar campanha para conversões.</span></p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#1C0F07;padding:20px 32px;text-align:center">
    <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px">
      Borges Assessoria Imobiliária · CRECI 40466 · Relatório semanal automático via GitHub Actions
    </p>
  </td></tr>

</table>
</body></html>"""

def send_email(subject, html):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = os.environ["GMAIL_USER"]
    msg["To"] = os.environ["REPORT_EMAIL"]
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(os.environ["GMAIL_USER"], os.environ["GMAIL_APP_PASSWORD"])
        server.sendmail(os.environ["GMAIL_USER"], os.environ["REPORT_EMAIL"], msg.as_string())

if __name__ == "__main__":
    week_start, week_end = get_week_label()

    ads = get_insights_weekly()
    campaign = get_campaign_status()
    prev_week = get_insights_prev_week()

    total_spend = sum(float(a.get("spend", 0)) for a in ads)
    total_clicks = sum(int(a.get("clicks", 0)) for a in ads)
    total_whatsapp = sum(get_action(a.get("actions"), "offsite_conversion.fb_pixel_contact") for a in ads)

    subject = (
        f"📊 Meta Ads Semanal {week_start}–{week_end} | "
        f"Gasto: R$ {total_spend:.2f} | "
        f"{total_clicks} cliques | "
        f"{total_whatsapp} WhatsApp"
    )
    html = build_html(ads, campaign, prev_week, week_start, week_end)

    send_email(subject, html)
    print(f"Relatório semanal enviado: {subject}")
