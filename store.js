                {allData
                  .filter((value) => {
                    if (searchTerm === "") {
                      return null;
                    } else if (
                      value.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((value, index) => {
                  return (
                  <div>
                    {value}
                    </div>
                  )
                }))}
