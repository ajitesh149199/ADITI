import "./PanelHeader.css";


function PanelHeader({
    icon: Icon,
    title,
    subtitle,
    status,
    accent = "cyan",
    statusType = "neutral"
}) {

    return (

        <div
            className={`aditi-panel-header panel-accent-${accent}`}
        >

            {/* LEFT SIDE */}

            <div className="aditi-panel-header-main">

                {/* ICON */}

                <div className="aditi-panel-icon">

                    {Icon && (
                        <Icon
                            size={22}
                            strokeWidth={1.6}
                            aria-hidden="true"
                        />
                    )}

                </div>


                {/* TITLE / DESCRIPTION */}

                <div className="aditi-panel-heading-text">

                    <h2>
                        {title}
                    </h2>

                    {subtitle && (

                        <p>
                            {subtitle}
                        </p>

                    )}

                </div>

            </div>


            {/* STATUS */}

            {status && (

                <div
                    className={`aditi-panel-status status-${statusType}`}
                >

                    <span className="aditi-panel-status-dot" />

                    <span>
                        {status}
                    </span>

                </div>

            )}


            {/* DIVIDER */}

            <div className="aditi-panel-header-line" />

        </div>

    );

}


export default PanelHeader;