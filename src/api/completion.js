export function getResponse(dispatch, parameters) {
  dispatch({
    type: "fetching",
  });

  console.log(parameters);
  fetch(
    `https://api.openai.com/v1/engines/${parameters.engine_id}/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: parameters.formData.GPTprompt,
        max_tokens: parseInt(parameters.max_tokens),
        temperature: parseFloat(parameters.temperature),
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // var choice = data.choices[0];

      dispatch({
        type: "fetched",
        text: parameters.formData.GPTprompt,
        data: data,
      });
    });

  // Mocking J

  // setTimeout(() => {
  //   dispatch({
  //     type: "fetched",
  //     text: formData.GPTprompt,
  //     data: {
  //       choices: [
  //         {
  //           text: "mock data",
  //         },
  //       ],
  //     },
  //   });
  // }, 1000);
}
